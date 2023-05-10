from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView

from userManage.models import UserPermission
from .models import ContactInfo, Shelter
from .serializers import ContactInfoSerializer, ShelterSerializer, UserPermissionSerializer


class ShelterList(ListAPIView):
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer


class ShelterCreate(CreateAPIView):
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer


class ShelterDetail(RetrieveUpdateDestroyAPIView):
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer


class ContactInfoList(ListAPIView):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer


class ContactInfoCreate(CreateAPIView):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer


class ContactInfoDetail(RetrieveUpdateDestroyAPIView):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer
    lookup_field = 'pk'


class UserPermissionList(ListAPIView):
    model = UserPermission
    serializer_class = UserPermissionSerializer

    def get_queryset(self):
        shelter_id = self.kwargs['shelter_id']
        queryset = self.model.objects.filter(shelter_id=shelter_id)
        return queryset


class UserPermissionCreate(CreateAPIView):
    model = UserPermission
    serializer_class = UserPermissionSerializer

    def get_queryset(self):
        shelter_id = self.kwargs['shelter_id']
        queryset = self.model.objects.filter(shelter_id=shelter_id)
        return queryset


class UserPermissionDetail(RetrieveUpdateDestroyAPIView):
    model = UserPermission
    serializer_class = UserPermissionSerializer
    lookup_field = 'pk'

    def get_queryset(self):
        shelter_id = self.kwargs['shelter_id']
        queryset = self.model.objects.filter(shelter_id=shelter_id)
        return queryset
