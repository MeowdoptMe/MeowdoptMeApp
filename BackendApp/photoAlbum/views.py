from rest_framework import status
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.response import Response

from .models import Photo, PhotoAlbum
from .permissions import PhotoPermission, PhotoAlbumPermission
from .serializers import PhotoSerializer, PhotoAlbumSerializer


class PhotoAlbumList(ListAPIView):
    queryset = PhotoAlbum.objects.all()
    serializer_class = PhotoAlbumSerializer


class PhotoAlbumCreate(CreateAPIView):
    queryset = PhotoAlbum.objects.all()
    serializer_class = PhotoAlbumSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        photos = request.FILES.getlist("photos")
        for photo in photos:
            Photo.objects.create(photo_album=serializer.instance, img=photo)

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class PhotoAlbumDetail(RetrieveUpdateDestroyAPIView):
    queryset = PhotoAlbum.objects.all()
    serializer_class = PhotoAlbumSerializer
    permission_classes = [PhotoAlbumPermission]
    lookup_field = "pk"


class PhotoList(ListAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


class PhotoCreate(CreateAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [PhotoPermission]


class PhotoDetail(RetrieveUpdateDestroyAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    lookup_field = "pk"
    permission_classes = [PhotoPermission]
