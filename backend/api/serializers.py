from django.contrib.auth import get_user_model

from rest_framework import serializers, status
from rest_framework.exceptions import ValidationError

from .models import Profile, Portfolio, PortfolioImage, Playlist, ContactUs

from users.serializers import UserListSerializer
from users.models import CustomUser

class ProfileSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    
    class Meta:
        model = Profile
        fields = ['description', 'image', 'vk', 'wa', 'tg', 'portfolio_favorites']

class PortfolioImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioImage
        fields = ['image']
        
class PortfolioSerializer(serializers.ModelSerializer):
    images = PortfolioImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False, use_url=False),
        write_only=True
    )
    
    class Meta:
        model = Portfolio
        fields = ['id', 'user', 'title', 'description', 'images', 'uploaded_images', 'date_work', 'created_at']
        
    def create(self, validated_data):
        uploaded_images = validated_data.pop("uploaded_images")
        portfolio = Portfolio.objects.create(**validated_data)

        for image in uploaded_images:
            PortfolioImage.objects.create(portfolio=portfolio, image=image)

        return portfolio
    
class PortfolioListSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field='username', read_only=True)
    user_image = serializers.SerializerMethodField()
    images = PortfolioImageSerializer(many=True)
    
    class Meta:
        model = Portfolio
        fields = ['id', 'user', 'title', 'description', 'images', 'user_image']
        
    def get_user_image(self, obj):
        request = self.context.get('request')
        if obj.user and hasattr(obj.user, 'profile') and obj.user.profile.image:
            return request.build_absolute_uri(obj.user.profile.image.url)
        return None
        
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