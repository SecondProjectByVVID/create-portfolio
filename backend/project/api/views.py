from django.shortcuts import render, redirect
from rest_framework import serializers, mixins, viewsets, status, generics
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import User, Portfolio
from .serializers import PortfolioSerializer, UserSerializer

# from rest_framework.views import APIView
# from rest_framework.generics import ListAPIView
# from django.views.generic import ListView, DetailView


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class PortfolioView(viewsets.ModelViewSet):
    serializer_class = PortfolioSerializer
    queryset = Portfolio.objects.all()
