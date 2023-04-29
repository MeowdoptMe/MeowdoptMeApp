from rest_framework.response import Response
from rest_framework.views import APIView
from .models import PhotoAlbum
from .serializers import PhotoAlbumSerializer

class PhotoAlbumList(APIView):
    def get(self, request):
        items = PhotoAlbum.objects.all()
        serializer = PhotoAlbumSerializer(items, many=True)
        return Response(serializer.data)

