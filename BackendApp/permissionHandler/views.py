from django.contrib.auth.models import Group, Permission
from rest_framework import status
from rest_framework.generics import (
    ListAPIView,
    RetrieveUpdateDestroyAPIView,
    get_object_or_404,
    CreateAPIView,
    UpdateAPIView,
    RetrieveDestroyAPIView,
)
from rest_framework.response import Response

from .models import UserPermission, PermissionRequest
from .permissions import UserPermissionAccess, PermissionRequestAccess
from .serializers import (
    UserPermissionSerializer,
    PermissionRequestSerializer,
)
from shelterRelated.models import Shelter

manager_permissions = ["add_shelter", "change_shelter", "delete_shelter"]
shelter_worker_permissions = ["add_shelter", "change_shelter"]
volunteer_permissions = ["add_shelter"]

class UserPermissionList(ListAPIView):
    model = UserPermission
    serializer_class = UserPermissionSerializer
    permission_classes = [UserPermissionAccess]

    def get_queryset(self):
        shelter_id = self.kwargs["shelter_id"]
        queryset = self.model.objects.filter(shelter_id=shelter_id)
        return queryset


class UserPermissionCreate(CreateAPIView):
    model = UserPermission
    serializer_class = UserPermissionSerializer
    permission_classes = [UserPermissionAccess]

    def get_queryset(self):
        shelter_id = self.kwargs["shelter_id"]
        queryset = self.model.objects.filter(shelter_id=shelter_id)
        return queryset


class UserPermissionDetail(RetrieveUpdateDestroyAPIView):
    model = UserPermission
    serializer_class = UserPermissionSerializer
    lookup_field = "pk"
    permission_classes = [UserPermissionAccess]

    def get_queryset(self):
        shelter_id = self.kwargs["shelter_id"]
        queryset = self.model.objects.filter(shelter_id=shelter_id)
        return queryset


class PermissionRequestList(ListAPIView):
    model = PermissionRequest
    serializer_class = PermissionRequestSerializer
    permission_classes = [PermissionRequestAccess]

    def get_queryset(self):
        shelter_id = self.kwargs["shelter_id"]
        queryset = self.model.objects.filter(shelter_id=shelter_id)
        return queryset


class PermissionRequestCreate(CreateAPIView):
    model = PermissionRequest
    serializer_class = PermissionRequestSerializer

    def post(self, request, shelter_id):
        shelter = Shelter.objects.get(id=shelter_id)
        permission_request = PermissionRequest.objects.create(
            user=request.user, shelter=shelter, group=request.data["group"]
        )
        serializer = self.get_serializer(permission_request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PermissionRequestDetail(RetrieveDestroyAPIView):
    model = PermissionRequest
    serializer_class = PermissionRequestSerializer
    lookup_field = "pk"
    permission_classes = [PermissionRequestAccess]

    def get_queryset(self):
        shelter_id = self.kwargs["shelter_id"]
        queryset = self.model.objects.filter(shelter_id=shelter_id)
        return queryset


class PermissionRequestResolve(UpdateAPIView):
    model = PermissionRequest
    serializer_class = PermissionRequestSerializer
    permission_classes = [PermissionRequestAccess]

    def get_queryset(self):
        shelter_id = self.kwargs["shelter_id"]
        queryset = self.model.objects.filter(shelter_id=shelter_id)
        return queryset

    def post(self, request, shelter_id, pk):
        permission_request = self.get_object()
        if permission_request.group == "Manager":
            for permission_codename in manager_permissions:
                permission = Permission.objects.get(codename=permission_codename)
                UserPermission.objects.create(
                    user=request.user, shelter_id=shelter_id, permission=permission
                )
        elif permission_request.group == "ShelterWorker":
            for permission_codename in shelter_worker_permissions:
                permission = Permission.objects.get(codename=permission_codename)
                UserPermission.objects.create(
                    user=request.user, shelter_id=shelter_id, permission=permission
                )
        elif permission_request.group == "Volunteer":
            for permission_codename in volunteer_permissions:
                permission = Permission.objects.get(codename=permission_codename)
                UserPermission.objects.create(
                    user=request.user, shelter_id=shelter_id, permission=permission
                )

        permission_request.delete()
        return Response(status=status.HTTP_201_CREATED)
