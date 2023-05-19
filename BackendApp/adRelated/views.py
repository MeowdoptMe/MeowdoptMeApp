from rest_framework import status
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.response import Response

from .models import Pet, Ad
from .permissions import AdRelatedPermission
from .serializers import PetSerializer, AdSerializer


class AdList(ListAPIView):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer
    lookup_field = "pk"


class AdCreate(CreateAPIView):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer
    permission_classes = [AdRelatedPermission]
    lookup_field = "pk"


class AdDetail(RetrieveUpdateDestroyAPIView):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer
    permission_classes = [AdRelatedPermission]
    lookup_field = "pk"


class PetList(ListAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer


class PetCreate(CreateAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [AdRelatedPermission]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if self.queryset.filter(name=serializer.validated_data["name"]).exists():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class PetDetail(RetrieveUpdateDestroyAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [AdRelatedPermission]
    lookup_field = "pk"
