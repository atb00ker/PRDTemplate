from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from server.users.views import LogoutView

urlpatterns = [
    # path('users/register', PRDView.as_view()),
    path('users/login/', obtain_auth_token, name='login'),
    path('users/logout/', LogoutView.as_view(), name='logout'),
]
