from django.shortcuts import render

from rest_framework import serializers, viewsets

from .models import Profile, Portfolio
from .serializers import ProfileSerializer, PortfolioSerializer


class PortfolioView(viewsets.ModelViewSet):
    serializer_class = PortfolioSerializer
    queryset = Portfolio.objects.all()


class ProfileView(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
