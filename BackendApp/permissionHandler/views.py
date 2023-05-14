from django.contrib.auth.models import Group, Permission
from rest_framework import status
from rest_framework.generics import (
    ListAPIView,
    RetrieveUpdateDestroyAPIView,
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
    queryset = PermissionRequest.objects.all()
    serializer_class = PermissionRequestSerializer
    permission_classes = [PermissionRequestAccess]

    def get_queryset(self):
        user_id = self.kwargs.get("user_id")
        shelter_id = self.kwargs.get("shelter_id")
        if shelter_id:
            queryset = PermissionRequest.objects.filter(shelter_id=shelter_id)
        elif user_id:
            queryset = PermissionRequest.objects.filter(user_id=user_id)
        else:
            queryset = PermissionRequest.objects.all()
        return queryset


class PermissionRequestCreate(CreateAPIView):
    model = PermissionRequest
    serializer_class = PermissionRequestSerializer

    def post(self, request):
        shelter = Shelter.objects.get(id=request.data["shelter_id"])
        if not PermissionRequest.objects.filter(
            user=request.user, shelter=shelter
        ).exists():
            permission_request = PermissionRequest.objects.create(
                user=request.user, shelter=shelter, group=request.data["group"]
            )
            serializer = self.get_serializer(permission_request)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status.HTTP_409_CONFLICT)


class PermissionRequestDetail(RetrieveDestroyAPIView):
    model = PermissionRequest
    serializer_class = PermissionRequestSerializer
    lookup_field = "pk"
    permission_classes = [PermissionRequestAccess]
    queryset = PermissionRequest.objects.all()


class PermissionRequestResolve(UpdateAPIView):
    model = PermissionRequest
    serializer_class = PermissionRequestSerializer
    permission_classes = [PermissionRequestAccess]
    queryset = PermissionRequest.objects.all()

    def post(self, request, pk):
        permission_request = self.get_object()
        if permission_request.group == "Manager":
            for permission_codename in PermissionRequestAccess.manager_permissions:
                permission = Permission.objects.get(codename=permission_codename)
                if not UserPermission.objects.filter(
                    user=request.user,
                    shelter=permission_request.shelter,
                    permission=permission,
                ).exists():
                    UserPermission.objects.create(
                        user=request.user,
                        shelter=permission_request.shelter,
                        permission=permission,
                    )
        elif permission_request.group == "ShelterWorker":
            for (
                permission_codename
            ) in PermissionRequestAccess.shelter_worker_permissions:
                permission = Permission.objects.get(codename=permission_codename)
                if not UserPermission.objects.filter(
                    user=request.user,
                    shelter=permission_request.shelter,
                    permission=permission,
                ).exists():
                    UserPermission.objects.create(
                        user=request.user,
                        shelter=permission_request.shelter,
                        permission=permission,
                    )
        elif permission_request.group == "Volunteer":
            for permission_codename in PermissionRequestAccess.volunteer_permissions:
                permission = Permission.objects.get(codename=permission_codename)
                if not UserPermission.objects.filter(
                    user=request.user,
                    shelter=permission_request.shelter,
                    permission=permission,
                ).exists():
                    UserPermission.objects.create(
                        user=request.user,
                        shelter=permission_request.shelter,
                        permission=permission,
                    )

        permission_request.delete()
        return Response(status=status.HTTP_201_CREATED)
