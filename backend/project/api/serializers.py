from rest_framework import serializers
from .models import User, Portfolio
from project import settings

# from allauth.account.adapter import get_adapter
# from allauth.account.utils import setup_user_email


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('__all__')


class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = ('__all__')
