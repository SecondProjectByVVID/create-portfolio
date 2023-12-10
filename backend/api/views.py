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
                raise ValidationError({'email': ['Пользователь с такой почтой уже существует.']})

            if User.objects.filter(mobile=serializer.validated_data['mobile']).exists():
                raise ValidationError({'mobile': ['Пользователь с таким мобильным телефоном уже существует.']})

            user = User.objects.create_user(**serializer.validated_data)

            response_data = {
                'id': user.id,
                'email': user.email,
                'mobile': str(user.mobile),
                'surname': user.surname,
                'name': user.name,
                'profession': user.profession,
            }

            return Response({'message': ['Добро пожаловать 😎']}, status=status.HTTP_200_OK)
        except ValidationError as validation_error:
            return Response(validation_error.message_dict, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def authenticate(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, email=email, password=password)

        try:
            if user is None:
                raise ValidationError({'error': ['Ошибка логина или пароля']})

            login(request, user)

            user_serializer = UserSerializer(user)
            user_data = user_serializer.data

            response_data = {
                'data': user_data,
                'authenticated': 'Добро пожаловать 😎'
            }

            return Response(response_data, status=status.HTTP_200_OK)
        except ValidationError as validation_error:
            return Response(validation_error.message_dict, status=status.HTTP_401_UNAUTHORIZED)


class PortfolioView(viewsets.ModelViewSet):
    serializer_class = PortfolioSerializer
    queryset = Portfolio.objects.all()


class ProfileView(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

