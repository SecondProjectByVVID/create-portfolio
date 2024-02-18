from rest_framework import serializers
from .models import Profile, Portfolio, PortfolioImage
from project import settings
from users.serializers import UserListSerializer
from rest_framework import serializers, status
from rest_framework.exceptions import ValidationError

class ProfileSerializer(serializers.ModelSerializer):
    user = UserListSerializer()
    class Meta:
        model = Profile
        fields = ('__all__')
        
class PortfolioImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioImage
        fields = ['image', 'portfolio']
        
class PortfolioSerializer(serializers.ModelSerializer):
    images = PortfolioImageSerializer(many=True)
    class Meta:
        model = Portfolio
        fields = ['id', 'user', 'title', 'description', 'images']
        
    def create(self, validated_data):
        images_data = validated_data.pop('images')
        if len(images_data) > 9:
            raise ValidationError({"message": "Вы можете загрузить не более 9 изображений"}, code=status.HTTP_400_BAD_REQUEST)
        portfolio = Portfolio.objects.create(**validated_data)
        for image_data in images_data:
            PortfolioImage.objects.create(portfolio=portfolio, **image_data)
        return portfolio
    