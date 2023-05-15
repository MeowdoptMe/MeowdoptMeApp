from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from .models import Pet, Ad
from .serializers import PetSerializer, AdSerializer


class AdList(ListAPIView):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer


class AdCreate(CreateAPIView):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer


class AdDetail(RetrieveUpdateDestroyAPIView):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer


class PetList(ListAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer


class PetCreate(CreateAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer


class PetDetail(RetrieveUpdateDestroyAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    lookup_field = "pk"
