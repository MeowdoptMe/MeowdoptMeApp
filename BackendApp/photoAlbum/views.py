from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView

from .models import PhotoAlbum, Photo
from .serializers import PhotoAlbumSerializer, PhotoSerializer

class PhotoAlbumList(ListAPIView):
    queryset = PhotoAlbum.objects.all()
    serializer_class = PhotoAlbumSerializer

class PhotoAlbumCreate(CreateAPIView):
    queryset = PhotoAlbum.objects.all()
    serializer_class = PhotoAlbumSerializer

class PhotoAlbumDetail(RetrieveUpdateDestroyAPIView):
    queryset = PhotoAlbum.objects.all()
    serializer_class = PhotoAlbumSerializer

class PhotoList(ListAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

class PhotoCreate(CreateAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

class PhotoDetail(RetrieveUpdateDestroyAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    lookup_field = 'pk'



