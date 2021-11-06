from rest_framework.views import APIView
from rest_framework.response import Response


class PRDView(APIView):
    def get(self, request):
        content = {'message': 'PRDTemplate'}
        return Response(content)
