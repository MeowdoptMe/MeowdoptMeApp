from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
    RetrieveAPIView,
)

from .models import ContactInfo, Shelter
from .serializers import (
    ContactInfoSerializer,
    ShelterSerializer,
)
from .permissions import ShelterPermission


class ShelterList(ListAPIView):
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer


class ShelterCreate(CreateAPIView):
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer
    permission_classes = [ShelterPermission]


class ShelterDetail(RetrieveUpdateDestroyAPIView):
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer
    permission_classes = [ShelterPermission]


class ContactInfoList(ListAPIView):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer


class ContactInfoCreate(CreateAPIView):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer


class ContactInfoDetail(RetrieveUpdateDestroyAPIView):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer
    lookup_field = "pk"
