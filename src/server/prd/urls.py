from django.contrib import admin
from django.urls import path

from server.prd.views import PRDView

app_name = 'prd'
urlpatterns = [
    path('prd/', PRDView.as_view(), name='prd'),
]
