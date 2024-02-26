from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework import serializers, status
from rest_framework.exceptions import ValidationError

from .models import Profile, Portfolio, PortfolioImage, Playlist, ContactUs

from users.serializers import UserListSerializer
from users.models import CustomUser

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['description', 'image', 'vk', 'wa', 'tg', 'portfolio_favorites']
        
class PortfolioImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioImage
        fields = ['image']
        
class PortfolioSerializer(serializers.ModelSerializer):
    images = PortfolioImageSerializer(many=True)
    class Meta:
        model = Portfolio
        fields = ['id', 'user', 'title', 'description', 'images', 'date_work', 'created_at']
        
    def create(self, validated_data):
        images_data = validated_data.pop('images')
        if len(images_data) > 9:
            raise ValidationError({"message": "Вы можете загрузить не более 9 изображений"}, code=status.HTTP_400_BAD_REQUEST)
        portfolio = Portfolio.objects.create(**validated_data)
        for image_data in images_data:
            PortfolioImage.objects.create(portfolio=portfolio, **image_data)
        return portfolio
    
class PortfolioListSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field='username', read_only=True)
    images = PortfolioImageSerializer(many=True)
    class Meta:
        model = Portfolio
        fields = ['user', 'title', 'description', 'images']
        
class UserProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='user.id')
    username = serializers.CharField(source='user.username')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.EmailField(source='user.email')
    mobile = serializers.CharField(source='user.mobile')
    profession = serializers.CharField(source='user.profession')
    location = serializers.CharField(source='user.location')

    class Meta:
        model = Profile
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'mobile', 'profession', 'location', 'description', 'image', 'vk', 'wa', 'tg', 'portfolio_favorites']

class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = ['id', 'title', 'projects', 'user']

class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = ['id', 'user', 'email', 'description', 'created_at']