from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response

from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.core.exceptions import ObjectDoesNotExist

from deep_translator import GoogleTranslator

from api.models import Profile 
from .models import CustomUser 
from .utils import check_captcha_reset, send_reset_password_email
from .tokens import account_activation_token

import requests
import uuid
import re

class UserListSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    
    class Meta:
        model = get_user_model()
        fields = ['id', 'first_name', 'last_name', 'email', 'mobile', 'profession', 'location', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        user = CustomUser(
            username=self.generate_unique_username(self.validated_data['first_name'], self.validated_data['last_name']),
            email=self.validated_data['email'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
            mobile=self.validated_data['mobile'],
            profession=self.validated_data['profession'],
            location=self.validated_data['location']
        )

        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({"message": "Пароли не совпадают"})
        user.set_password(password)
        user.save()
        
        Profile.objects.create(user=user)
        
        return user

    def generate_unique_username(self, first_name, last_name):
        first_name_en = GoogleTranslator(source='auto', target='english').translate(first_name)
        last_name_en = GoogleTranslator(source='auto', target='english').translate(last_name)
        
        first_name_en = re.sub(r'[^a-zA-Z0-9.@_+-]', '', first_name_en)
        last_name_en = re.sub(r'[^a-zA-Z0-9.@_+-]', '', last_name_en)

        base_username = f"{first_name_en}_{last_name_en}"

        unique_part = str(uuid.uuid4())[:8]

        unique_username = f"@{base_username}_{unique_part}"

        try:
            get_user_model().objects.get(username=unique_username)
            return self.generate_unique_username(first_name, last_name)
        except ObjectDoesNotExist:
            return unique_username

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Старый пароль неверен")
        return value

    def validate_new_password(self, value):
        old_password = self.initial_data.get('old_password')
        if old_password == value:
            raise serializers.ValidationError("Новый пароль не может совпадать со старым")
        return value
    
    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    g_recaptcha_response = serializers.CharField(required=True)

    def validate(self, data):
        user = get_user_model().objects.filter(email=data['email']).first()
        if not user:
            raise serializers.ValidationError("Пользователь с таким email не найден")

        check_captcha_reset(data)

        return data

    def save(self):
        user = get_user_model().objects.filter(email=self.validated_data['email']).first()
        send_reset_password_email(self.context['request'], user)
        return user
    
class PasswordResetConfirmSerializer(serializers.Serializer):
    uidb64 = serializers.CharField(required=True)
    token = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate(self, data):
        try:
            uid = force_str(urlsafe_base64_decode(data['uidb64']))
            user = get_user_model().objects.get(pk=uid)
        except:
            raise serializers.ValidationError("Ссылка для сброса пароля недействительна")

        if not account_activation_token.check_token(user, data['token']):
            raise serializers.ValidationError("Ссылка для сброса пароля недействительна")
        
        if user.check_password(data['new_password']):
            raise serializers.ValidationError("Новый пароль не может совпадать со старым")

        return data

    def save(self):
        uid = force_str(urlsafe_base64_decode(self.validated_data['uidb64']))
        user = get_user_model().objects.get(pk=uid)
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user
    
class UserUpdateSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True, required=False)
    
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'mobile', 'profession', 'location', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
            'username': {'required': False},
            'email': {'required': False},
            'mobile': {'required': False},
            'profession': {'required': False},
            'location': {'required': False},
        }

