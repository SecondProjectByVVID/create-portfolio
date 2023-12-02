from django.shortcuts import render, redirect
from rest_framework import serializers, mixins, viewsets, status, generics
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import User, Profile, Portfolio
from .serializers import UserSerializer, ProfileSerializer, PortfolioSerializer
from django.contrib.auth import authenticate, login
from rest_framework.decorators import action
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)

            if User.objects.filter(email=serializer.validated_data['email']).exists():
                raise ValidationError({'email': 'Пользователь с такой почтой уже существует.'})

            if User.objects.filter(mobile=serializer.validated_data['mobile']).exists():
                raise ValidationError({'mobile': 'Пользователь с таким мобильным телефоном уже существует.'})

            user = User.objects.create_user(**serializer.validated_data)

            response_data = {
                'id': user.id,
                'email': user.email,
                'mobile': str(user.mobile),
                'surname': user.surname,
                'name': user.name,
                'profession': user.profession,
            }

            return Response(response_data, status=status.HTTP_201_CREATED)
        except ValidationError as validation_error:
            return Response({'error': str(validation_error)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def authenticate(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Пожалуйста, предоставьте email и пароль'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, email=email, password=password)

        if user is not None:
            login(request, user)
            return Response({'authenticated': True}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Ошибка логина или пароля'}, status=status.HTTP_401_UNAUTHORIZED)


class PortfolioView(viewsets.ModelViewSet):
    serializer_class = PortfolioSerializer
    queryset = Portfolio.objects.all()


class ProfileView(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

