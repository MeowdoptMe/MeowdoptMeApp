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
from .utils import convert_to_jpg


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
            image = Photo.objects.create(photo_album=serializer.instance, img=photo)
            image.img = convert_to_jpg(image.img)

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
    serializer_class = PhotoSerializer

    def get_queryset(self):
        queryset = Photo.objects.all()
        id = self.kwargs["id"]
        if id:
            queryset = queryset.filter(photo_album_id=id)
        return queryset


class PhotoCreate(CreateAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [PhotoPermission]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["photo_album"] = self.kwargs.get("id")
        return context


class PhotoDetail(RetrieveUpdateDestroyAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    lookup_field = "pk"
    permission_classes = [PhotoPermission]
