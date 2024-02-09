from django.shortcuts import render, redirect
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth import get_user_model, login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.conf import settings

from rest_framework import status, serializers, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .permissions import IsNotAuthenticated
from .models import CustomUser
from .serializers import UserSerializer, UserListSerializer
from .tokens import account_activation_token
from .utils import check_captcha
import requests


class RegisterView(APIView):
    permission_classes = [IsNotAuthenticated]
    
    def post(self, request):
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


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()


class UserListView(viewsets.ModelViewSet):
    serializer_class = UserListSerializer
    queryset = get_user_model().objects.all()


class LoginView(APIView):
    permission_classes = [IsNotAuthenticated]

    def post(self, request):
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
    
        if failed_attempts >= 3:
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
    permission_classes = [IsAuthenticated,]

    def post(self, request):
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


def activateEmail(request, user):
    mail_subject = 'Активируйте свою учетную запись пользователя.'
    domain = get_current_site(request).domain
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = account_activation_token.make_token(user)
    protocol = 'https' if request.is_secure() else 'http'
    activation_link = f'http://127.0.0.1:8000/activate/{uid}/{token}'
    message = f"""
    Дорогой {user.first_name},
    
    Спасибо за регистрацию! Пожалуйста, перейдите по следующей ссылке, чтобы подтвердить свою учетную запись:
    
    {activation_link}
    
    Если вы не запрашивали это письмо, просто проигнорируйте его.
    
    С уважением,
    Pozor
    """
    email = EmailMessage(mail_subject, message, to=[user.email])
    if email.send():
        return Response({"message": f"Дорогой {user.first_name}, пожалуйста, перейдите в свой почтовый ящик {user.email} и нажмите на полученную ссылку активации, чтобы подтвердить и завершить регистрацию. Примечание: проверьте папку со спамом."}, status=status.HTTP_200_OK)
    else:
        return Response({"message": f"Проблема с отправкой подтверждающего письма на {user.email}, проверьте, правильно ли вы его ввели."}, status=status.HTTP_400_BAD_REQUEST)
