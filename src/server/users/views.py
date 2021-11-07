from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from server.users.serializers import SignUpSerializer


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def get(self, request):
        Token.objects.get(user=request.user).delete()
        return Response(status=200)


class RegisterView(CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = SignUpSerializer
