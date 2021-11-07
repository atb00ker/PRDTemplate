from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from server.users.views import LogoutView, RegisterView

urlpatterns = [
    path('users/register/', RegisterView.as_view(), name='register'),
    path('users/login/', obtain_auth_token, name='login'),
    path('users/logout/', LogoutView.as_view(), name='logout'),
]
