from rest_framework.permissions import BasePermission
from permissionHandler.models import UserPermission


class ShelterPermission(BasePermission):
    def has_permission(self, request, view):
        permission = True
        if request.method == "POST":
            permission = UserPermission.objects.filter(
                user_id=request.user.id, permission_id=48
            )

        if request.method == "PUT":
            permission = UserPermission.objects.filter(
                user_id=request.user.id, permission_id=49
            )

        if request.method == "DELETE":
            permission = UserPermission.objects.filter(
                user_id=request.user.id, permission_id=50
            )

        if permission:
            return True
        return False
