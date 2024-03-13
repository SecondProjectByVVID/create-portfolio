from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.conf import settings

from rest_framework import serializers, viewsets, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Profile, Portfolio, Playlist, ContactUs
from .serializers import ProfileSerializer, PortfolioSerializer, PortfolioListSerializer, UserProfileSerializer, PlaylistSerializer, ContactUsSerializer

from users.models import CustomUser
from users.serializers import UserUpdateSerializer

from datetime import timedelta
from uuid import uuid4

import requests
import os

from django.contrib.postgres.search import SearchVector, SearchQuery
from django.db.models import Q
from psycopg2.extensions import adapt

class ProfileView(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

class PortfolioView(viewsets.ModelViewSet):
    serializer_class = PortfolioSerializer
    queryset = Portfolio.objects.all()
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"message": "Вы должны войти в систему, чтобы создать проект"}, status=status.HTTP_403_FORBIDDEN)
        
        if 'user' in request.data and int(request.data['user']) != request.user.id:
            return Response({"message": "Вы не можете создать проект для другого пользователя"}, status=status.HTTP_403_FORBIDDEN)
        
        if len(request.data.get('uploaded_images', [])) > 9:
            return Response({"message": "Вы не можете загрузить более 9 изображений"}, status=status.HTTP_400_BAD_REQUEST)
        
        response = super().create(request, *args, **kwargs)
        if response.status_code == status.HTTP_201_CREATED:
            return Response({"message": "Вы создали проект"}, status=status.HTTP_201_CREATED)
        return response

    def update(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"message": "Вы должны войти в систему, чтобы обновить проект"}, status=status.HTTP_403_FORBIDDEN)
        portfolio = self.get_object()
        
        if request.user != portfolio.user:
            return Response({"message": "Вы не можете изменить проект другого пользователя"}, status=status.HTTP_403_FORBIDDEN)
        
        response = super().update(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            return Response({"message": "Данные успешно изменены"}, status=status.HTTP_200_OK)
        return response

    def destroy(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"message": "Вы должны войти в систему, чтобы удалить проект"}, status=status.HTTP_403_FORBIDDEN)
        portfolio = self.get_object()
        
        if request.user != portfolio.user:
            return Response({"message": "Вы не можете удалить проект другого пользователя"}, status=status.HTTP_403_FORBIDDEN)
        
        response = super().destroy(request, *args, **kwargs)
        if response.status_code == status.HTTP_204_NO_CONTENT:
            return Response({"message": "Проект успешно удалён"}, status=status.HTTP_204_NO_CONTENT)
        return response

class PrefixedSearchQuery(SearchQuery):
    def as_sql(self, compiler, connection):
        params = ['%s:*' % self.source_expressions[0].value]
        return 'to_tsquery(%s)', params

class PortfolioListView(generics.ListAPIView):
    serializer_class = PortfolioListSerializer

    def get_queryset(self):
        queryset = Portfolio.objects.all().order_by('-created_at')
        search = self.request.query_params.get('search', None)

        if search is not None:
            vector = SearchVector('title', 'description', 'user__profession')
            query = PrefixedSearchQuery(search)
            queryset = queryset.annotate(search=vector).filter(search=query)

        return queryset
    
class UserProfileView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def get(self, request, pk=None, format=None):
        if pk:
            user = CustomUser.objects.get(pk=pk)
            users = [user]
        else:
            users = CustomUser.objects.all()
        user_profile_list = []
        for user in users:
            try:
                profile = Profile.objects.get(user=user)
                serializer = UserProfileSerializer(profile)
                user_profile_list.append(serializer.data)
            except Profile.DoesNotExist:
                user_serializer = UserUpdateSerializer(user)
                user_profile_list.append(user_serializer.data)
        return Response(user_profile_list)

    def patch(self, request, pk, format=None):
        if not request.user.is_authenticated:
            return Response({"message": "Вы должны войти в систему, чтобы изменить профиль"}, status=status.HTTP_403_FORBIDDEN)

        user = CustomUser.objects.get(pk=pk)
        if request.user != user:
            return Response({"message": "Вы не можете изменить профиль другого пользователя"}, status=status.HTTP_403_FORBIDDEN)

        try:
            profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            return Response({'message': "Профиль этого пользователя не существует"}, status=status.HTTP_404_NOT_FOUND)
        
        data = request.data.copy()

        image = data.get('image')
        if isinstance(image, str):
            del data['image']

        user_serializer = UserUpdateSerializer(user, data=data, partial=True)
        profile_serializer = ProfileSerializer(profile, data=data, partial=True)

        if user_serializer.is_valid() and profile_serializer.is_valid():
            user_serializer.save()
            profile_serializer.save()
            return Response({"message": "Данные успешно изменены"}, status=status.HTTP_200_OK)
        else:
            error_message = ', '.join([str(err[0]) for err in user_serializer.errors.values()] + [str(err[0]) for err in profile_serializer.errors.values()])
            return Response({"message": error_message}, status=status.HTTP_400_BAD_REQUEST)

class PlaylistView(viewsets.ModelViewSet):
    serializer_class = PlaylistSerializer
    queryset = Playlist.objects.all()
    
    def create(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"message": "Вы должны войти в систему, чтобы создать плейлист"}, status=status.HTTP_403_FORBIDDEN)
        
        if 'user' in request.data and request.data['user'] != request.user.id:
            return Response({"message": "Вы не можете создать плейлист для другого пользователя"}, status=status.HTTP_403_FORBIDDEN)
        
        response = super().create(request, *args, **kwargs)
        if response.status_code == status.HTTP_201_CREATED:
            return Response({"message": "Вы создали плейлист"}, status=status.HTTP_201_CREATED)
        return response

    def update(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"message": "Вы должны войти в систему, чтобы обновить плейлист"}, status=status.HTTP_403_FORBIDDEN)
        playlist = self.get_object()
        
        if request.user != playlist.user:
            return Response({"message": "Вы не можете изменить плейлист другого пользователя"}, status=status.HTTP_403_FORBIDDEN)
        
        response = super().update(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            return Response({"message": "Данные успешно изменены"}, status=status.HTTP_200_OK)
        return response

    def destroy(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"message": "Вы должны войти в систему, чтобы удалить плейлист"}, status=status.HTTP_403_FORBIDDEN)
        playlist = self.get_object()
        
        if request.user != playlist.user:
            return Response({"message": "Вы не можете удалить плейлист другого пользователя"}, status=status.HTTP_403_FORBIDDEN)
        
        response = super().destroy(request, *args, **kwargs)
        if response.status_code == status.HTTP_204_NO_CONTENT:
            return Response({"message": "Плейлист успешно удалён"}, status=status.HTTP_204_NO_CONTENT)
        return response
    
class ContactUsView(viewsets.ModelViewSet):
    serializer_class = ContactUsSerializer
    queryset = ContactUs.objects.all()
    
    def create(self, request, *args, **kwargs):
        one_day_ago = timezone.now() - timedelta(days=1)
        recent_requests = ContactUs.objects.filter(user=request.user, created_at__gte=one_day_ago)
        if recent_requests.exists():
            return Response({"message": "Вы можете отправить только одну заявку в день"}, status=status.HTTP_400_BAD_REQUEST)
        
        response = super().create(request, *args, **kwargs)
        if response.status_code == status.HTTP_201_CREATED:
            return Response({"message": "Вы отправили письмо"}, status=status.HTTP_201_CREATED)
        return response
    
class UserContactUs(generics.ListAPIView):
    serializer_class = ContactUsSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return ContactUs.objects.filter(user_id=user_id)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    