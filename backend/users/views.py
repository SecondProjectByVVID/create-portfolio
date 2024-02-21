from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model, login, logout, authenticate
from django.contrib import messages
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.core.mail import EmailMessage
from django.conf import settings

from django.http import HttpResponse

from rest_framework import status, serializers, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import CustomUser
from .serializers import UserListSerializer, ChangePasswordSerializer, PasswordResetRequestSerializer, PasswordResetConfirmSerializer
from .tokens import account_activation_token
from .utils import check_captcha, activateEmail

import requests

class UserListView(viewsets.ModelViewSet):
    serializer_class = UserListSerializer
    queryset = get_user_model().objects.all()

class RegisterView(APIView):
    def post(self, request):
        if request.user.is_authenticated:
            return Response({"message": "Вы уже вошли в систему"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UserListSerializer(data=request.data)
        email = request.data.get('email')
        mobile = request.data.get('mobile')

        if get_user_model().objects.filter(email=email).exists():
            return Response({"message": "Пользователь с такой почтой уже существует."}, status=status.HTTP_400_BAD_REQUEST)
        if get_user_model().objects.filter(mobile=mobile).exists():
            return Response({"message": "Пользователь с таким номером телефона уже существует."}, status=status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid():
            user = serializer.save()
            user.is_active = False
            user.save()
            activateEmail(request, user)
            return Response({"message": f"Добро пожаловать {user.first_name}! Пожалуйста, подтвердите свою электронную почту."}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        if request.user.is_authenticated:
            return Response({"message": "Вы уже вошли в систему"}, status=status.HTTP_400_BAD_REQUEST)
        
        email = request.data.get('email')
        password = request.data.get('password')
    
        failed_attempts = request.session.get('failed_attempts', 0)
    
        try:
            user = get_user_model().objects.get(email=email)
        except get_user_model().DoesNotExist:
            failed_attempts += 1
            request.session['failed_attempts'] = failed_attempts
            captcha_response = check_captcha(request, failed_attempts)
            if captcha_response is not None:
                return captcha_response
            return Response({"message": "Неправильная почта или пароль.", "failed_attempts": failed_attempts}, status=status.HTTP_400_BAD_REQUEST)
    
        if failed_attempts >= 4:
            captcha_response = check_captcha(request, failed_attempts)
            if captcha_response is not None:
                return captcha_response
    
        if user.check_password(password):
            if user.is_active:
                request.session['failed_attempts'] = 0
                login(request, user)
                
                return Response({"message": f"Добро пожаловать {user.first_name}!", "id": user.id}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Пожалуйста, подтвердите свой аккаунт перед входом в систему."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            failed_attempts += 1
            request.session['failed_attempts'] = failed_attempts
            return Response({"message": "Неправильная почта или пароль.", "failed_attempts": failed_attempts}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            return Response({"message": "Вы должны войти в систему, чтобы выйти из неё"}, status=status.HTTP_400_BAD_REQUEST)
        
        logout(request)
        return Response({"message": "Вы успешно вышли из системы."}, status=status.HTTP_200_OK)

class ActivateAccount(APIView):
    def get(self, request, uidb64, token):
        User = get_user_model()
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
            login(request, user)
            return redirect(f'http://127.0.0.1:3000/account-activation/Благодарим вас за подтверждение электронной почты. Теперь вы можете войти в свой аккаунт.')
        else:
            return redirect('http://127.0.0.1:3000/account-activation/Ссылка активации недействительна!')
        
class ChangePasswordView(APIView):
    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"message": "Вы должны войти в систему, чтобы изменить пароль"}, status=status.HTTP_403_FORBIDDEN)
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "Пароль успешно изменён"}, status=status.HTTP_200_OK)
        return Response({"message": next(iter(serializer.errors.values()))[0]}, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetRequestView(APIView):
    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return Response({"message": "Вы должны выйти из системы, чтобы сбросить пароль"}, status=status.HTTP_403_FORBIDDEN)        
        serializer = PasswordResetRequestSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.save()
            user.password_reset_token_used = False
            user.save()
            return Response({"message": "Письмо для сброса пароля отправлено"}, status=status.HTTP_200_OK)
        return Response({"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetConfirmView(APIView):
    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return Response({"message": "Вы должны выйти из системы, чтобы установить новый пароль"}, status=status.HTTP_403_FORBIDDEN) 
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user.password_reset_token_used:
                return Response({"message": "Ссылка для сброса пароля уже была использована"}, status=status.HTTP_400_BAD_REQUEST)
            user.password_reset_token_used = True
            user.save()
            return Response({"message": "Пароль успешно изменён"}, status=status.HTTP_200_OK)
        return Response({"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

def vk_login(request):
    return redirect(f'https://oauth.vk.com/authorize?client_id={settings.VK_CLIENT_ID}&redirect_uri={settings.VK_REDIRECT_URI}&response_type=code')

def vk_callback(request):
    code = request.GET.get('code')
    if code:
        try:
            response = requests.get(f'https://oauth.vk.com/access_token?client_id={settings.VK_CLIENT_ID}&client_secret={settings.VK_CLIENT_SECRET}&redirect_uri={settings.VK_REDIRECT_URI}&code={code}')
            response.raise_for_status()
            access_token = response.json().get('access_token')
            return redirect('/')
        except requests.RequestException as e:
            print(f'Ошибка при выполнении запроса к VK API: {e}')
    return redirect('/')


    