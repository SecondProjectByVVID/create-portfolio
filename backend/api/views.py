from django.shortcuts import render

from rest_framework import serializers, viewsets, status
from rest_framework.response import Response

from .models import Profile, Portfolio
from .serializers import ProfileSerializer, PortfolioSerializer


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
    
    def destroy(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"message": "Вы должны войти в систему, чтобы удалить профиль"}, status=status.HTTP_403_FORBIDDEN)
        profile = self.get_object()
        
        if request.user != profile.user:
            return Response({"message": "Вы не можете удалить профиль другого пользователя"}, status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)