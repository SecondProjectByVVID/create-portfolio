from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ['password']


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
            username=self.validated_data['email'],
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
        return user
