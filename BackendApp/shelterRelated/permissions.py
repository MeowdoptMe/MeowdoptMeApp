from django.contrib.auth.models import Permission
from rest_framework.permissions import BasePermission
from permissionHandler.models import UserPermission


class ShelterPermission(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_staff or not request.user.is_superuser:
            permission = True
            if request.method == "POST":
                id = Permission.objects.get(codename="add_shelter")
                permission = UserPermission.objects.filter(
                    user_id=request.user.id, permission_id=id
                )

            if request.method == "PUT":
                id = Permission.objects.get(codename="change_shelter")
                permission = UserPermission.objects.filter(
                    user_id=request.user.id, permission_id=id
                )

            if request.method == "DELETE":
                id = Permission.objects.get(codename="delete_shelter")
                permission = UserPermission.objects.filter(
                    user_id=request.user.id, permission_id=id
                )

            if permission:
                return True
            return False
        return True
