from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User


class SignUpSerializer(ModelSerializer):
    password = serializers.CharField(max_length=128, write_only=True)

    class Meta:
        model = User
        fields = (
            'username',
            'email',
            'password',
        )

    def save(self):
        password = self.validated_data.pop('password')
        user = User.objects.create(**self.validated_data)
        user.set_password(password)
        user.save()
        return user
