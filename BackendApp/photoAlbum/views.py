from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from .models import Photo
from .serializers import PhotoSerializer


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
