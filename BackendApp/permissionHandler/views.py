from django.contrib.auth.models import Group
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


class GroupPermissionList(ListAPIView):
    serializer_class = UserPermissionSerializer

    def get_queryset(self):
        group_id = self.kwargs.get("group_id")
        try:
            group = Group.objects.get(id=group_id)
            queryset = group.permissions.all()
            return queryset
        except Group.DoesNotExist:
            return []


class GroupPermissionDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = UserPermissionSerializer
    lookup_url_kwarg = "permission_id"

    def get_queryset(self):
        group_id = self.kwargs.get("group_id")
        try:
            group = Group.objects.get(id=group_id)
            queryset = group.permissions.all()
            return queryset
        except Group.DoesNotExist:
            return []

    def get_object(self):
        permission_id = self.kwargs.get("permission_id")
        queryset = self.filter_queryset(self.get_queryset())
        obj = get_object_or_404(queryset, id=permission_id)
        return obj


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

    def get_queryset(self):
        shelter_id = self.kwargs["shelter_id"]
        queryset = self.model.objects.filter(shelter_id=shelter_id)
        return queryset


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
        user_permission = UserPermission.objects.create(
            user=permission_request.user,
            shelter=permission_request.shelter,
            permission=permission_request.permission,
        )
        serializer = self.get_serializer(user_permission)
        permission_request.delete()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
