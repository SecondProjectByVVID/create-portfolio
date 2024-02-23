from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.utils import timezone

from rest_framework import serializers, viewsets, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Profile, Portfolio, Playlist, ContactUs
from .serializers import ProfileSerializer, PortfolioSerializer, PortfolioListSerializer, UserProfileSerializer, PlaylistSerializer, ContactUsSerializer

from users.models import CustomUser
from users.serializers import UserUpdateSerializer

from datetime import timedelta
from uuid import uuid4

import os

class ProfileView(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

class PortfolioView(viewsets.ModelViewSet):
    serializer_class = PortfolioSerializer
    queryset = Portfolio.objects.all()

    def create(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"message": "Вы должны войти в систему, чтобы создать портфолио"}, status=status.HTTP_403_FORBIDDEN)
        
        if 'user' in request.data and request.data['user'] != request.user.id:
            return Response({"message": "Вы не можете создать портфолио для другого пользователя"}, status=status.HTTP_403_FORBIDDEN)
        
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"message": "Вы должны войти в систему, чтобы обновить портфолио"}, status=status.HTTP_403_FORBIDDEN)
        portfolio = self.get_object()
        
        if request.user != portfolio.user:
            return Response({"message": "Вы не можете изменить портфолио другого пользователя"}, status=status.HTTP_403_FORBIDDEN)
        
        if 'image' in request.FILES:
            file_obj = request.FILES['image']
            file_name_suffix = file_obj.name.split(".")[-1]
            if file_name_suffix not in ["jpg", "png", "gif", "jpeg"]:
                return Response({"message": f"Неверное расширение файла ({file_name_suffix}), поддерживаются .jpg, .png, .gif, .jpeg"}, status=status.HTTP_400_BAD_REQUEST)

            file_path = os.path.join('portfolio_images', str(portfolio.id), file_obj.name)

            if os.path.exists(os.path.join(settings.MEDIA_ROOT, file_path)):
                file_obj.name = str(uuid4()) + '.' + file_name_suffix
                file_path = os.path.join('portfolio_images', str(portfolio.id), file_obj.name)

            portfolio.image.save(file_obj.name, file_obj)
            portfolio.save()

        return super().update(request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"message": "Вы должны войти в систему, чтобы удалить портфолио"}, status=status.HTTP_403_FORBIDDEN)
        portfolio = self.get_object()
        
        if request.user != portfolio.user:
            return Response({"message": "Вы не можете удалить портфолио другого пользователя"}, status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)

class PortfolioListView(generics.ListAPIView):
    serializer_class = PortfolioListSerializer

    def get_queryset(self):
        queryset = Portfolio.objects.all().order_by('-created_at')

        search = self.request.query_params.get('search', None)

        if search is not None:
            queryset = queryset.filter(title__icontains=search)

        return queryset
    
class UserProfileView(APIView):
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

        if 'image' in request.FILES:
            file_obj = request.FILES['image']
            file_name_suffix = file_obj.name.split(".")[-1]
            if file_name_suffix not in ["jpg", "png", "gif", "jpeg"]:
                return Response({"message": f"Неверное расширение файла ({file_name_suffix}), поддерживаются .jpg, .png, .gif, .jpeg"}, status=status.HTTP_400_BAD_REQUEST)

            file_path = os.path.join('user_images', str(profile.id), file_obj.name)

            if os.path.exists(os.path.join(settings.MEDIA_ROOT, file_path)):
                file_obj.name = str(uuid4()) + '.' + file_name_suffix
                file_path = os.path.join('user_images', str(profile.id), file_obj.name)

            profile.image.save(file_obj.name, file_obj)
            profile.save()

        user_serializer = UserUpdateSerializer(user, data=request.data, partial=True)
        profile_serializer = ProfileSerializer(profile, data=request.data, partial=True)

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
        
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"message": "Вы должны войти в систему, чтобы обновить плейлист"}, status=status.HTTP_403_FORBIDDEN)
        playlist = self.get_object()
        
        if request.user != playlist.user:
            return Response({"message": "Вы не можете изменить плейлист другого пользователя"}, status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"message": "Вы должны войти в систему, чтобы удалить плейлист"}, status=status.HTTP_403_FORBIDDEN)
        playlist = self.get_object()
        
        if request.user != portfolio.user:
            return Response({"message": "Вы не можете удалить плейлист другого пользователя"}, status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)
    
class ContactUsView(viewsets.ModelViewSet):
    serializer_class = ContactUsSerializer
    queryset = ContactUs.objects.all()
    
    def create(self, request, *args, **kwargs):
        one_day_ago = timezone.now() - timedelta(days=1)
        recent_requests = ContactUs.objects.filter(user=request.user, created_at__gte=one_day_ago)
        if recent_requests.exists():
            return Response({"message": "Вы можете отправить только одну заявку в день"}, status=status.HTTP_400_BAD_REQUEST)
        
        return super().create(request, *args, **kwargs)
    