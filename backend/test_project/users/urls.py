from django.urls import path 

from .views import *


urlpatterns = [
    path("users", UserController.as_view(), name="get all users"),
    path("users/<int:pk>", UserController.as_view(), name="delete user"),
    path("users", UserController.as_view(), name="add user"),
    path("users/<int:pk>", UserController.as_view(), name="update user"),

]