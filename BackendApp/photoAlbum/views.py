from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.response import Response

from .models import Photo, PhotoAlbum
from .serializers import PhotoSerializer, PhotoAlbumSerializer


class PhotoAlbumList(ListAPIView):
    queryset = PhotoAlbum.objects.all()
    serializer_class = PhotoAlbumSerializer


class PhotoAlbumCreate(CreateAPIView):
    queryset = PhotoAlbum.objects.all()
    serializer_class = PhotoAlbumSerializer


class PhotoAlbumDetail(RetrieveUpdateDestroyAPIView):
    queryset = PhotoAlbum.objects.all()
    serializer_class = PhotoAlbumSerializer
    lookup_field = "pk"


class PhotoList(ListAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


class PhotoCreate(CreateAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


class PhotoDetail(RetrieveUpdateDestroyAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    lookup_field = "pk"
