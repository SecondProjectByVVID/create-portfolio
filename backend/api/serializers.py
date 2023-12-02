from rest_framework import serializers
from .models import User, Profile, Portfolio
from project import settings
from phonenumber_field.serializerfields import PhoneNumberField



class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    mobile = PhoneNumberField()
    
    class Meta:
        model = User
        fields = ('id', 'email', 'mobile', 'surname', 'name', 'profession', 'password',)


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Profile
        fields = ('__all__')


class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = ('__all__')
