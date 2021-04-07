from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)

from .serializers import *
from .models import *
# Create your views here.

class UserController(APIView):
    def get(self, request):
        users = User.objects.all()
        s_users = UserSerializer(users, many=True)
        return Response(s_users.data)
    def post(self, request):
        s_users = UserSerializer(data = request.data , context = {"request" : request})
        if s_users.is_valid():
            s_users.save()
            return Response(s_users.data, status=HTTP_201_CREATED)        

        return Response(s_users.errors, status=HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):

        user = User.objects.get(pk=pk)
        s_users = UserSerializer(user , data = request.data , context = {"request" : request})
        if s_users.is_valid():
            s_users.save()
            return Response(s_users.data, status=HTTP_200_OK)        

        return Response(s_users.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = User.objects.get(pk=pk)
        user.delete()
        return Response(status=HTTP_204_NO_CONTENT)
