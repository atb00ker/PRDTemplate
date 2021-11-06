from django.contrib import admin
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    # path('users/register', PRDView.as_view()),
    path('users/login/', obtain_auth_token, name='api_token_auth'),
]
