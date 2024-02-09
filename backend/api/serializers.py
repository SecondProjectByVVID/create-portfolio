from rest_framework import serializers
from .models import Profile, Portfolio
from project import settings
from users.serializers import UserListSerializer


class ProfileSerializer(serializers.ModelSerializer):
    user = UserListSerializer()
    class Meta:
        model = Profile
        fields = ('__all__')


class PortfolioSerializer(serializers.ModelSerializer):
    user = UserListSerializer()
    class Meta:
        model = Portfolio
        fields = ('__all__')
