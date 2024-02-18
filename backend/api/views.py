from django.shortcuts import render

from rest_framework import serializers, viewsets, status
from rest_framework.response import Response

from .models import Profile, Portfolio
from .serializers import ProfileSerializer, PortfolioSerializer

import os
from uuid import uuid4


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

class ProfileView(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def update(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"message": "Вы должны войти в систему, чтобы обновить профиль"}, status=status.HTTP_403_FORBIDDEN)
        profile = self.get_object()
        
        if request.user != profile.user:
            return Response({"message": "Вы не можете изменить профиль другого пользователя"}, status=status.HTTP_403_FORBIDDEN)
        return super().update(request, *args, **kwargs)

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

        return super().update(request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"message": "Вы должны войти в систему, чтобы удалить профиль"}, status=status.HTTP_403_FORBIDDEN)
        profile = self.get_object()
        
        if request.user != profile.user:
            return Response({"message": "Вы не можете удалить профиль другого пользователя"}, status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)
    
    