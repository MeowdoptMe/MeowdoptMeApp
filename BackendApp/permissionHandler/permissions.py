from rest_framework.permissions import BasePermission

from .models import UserPermission, PermissionRequest


class UserPermissionAccess(BasePermission):
    def has_permission(self, request, view):
        shelter_id = view.kwargs.get("shelter_id")
        permission = True
        if request.method == "POST":
            permission = UserPermission.objects.filter(
                user_id=request.user.id, shelter_id=shelter_id, permission_id=71
            )

        if request.method == "PUT":
            permission = UserPermission.objects.filter(
                user_id=request.user.id, shelter_id=shelter_id, permission_id=72
            )

        if request.method == "DELETE":
            permission = UserPermission.objects.filter(
                user_id=request.user.id, shelter_id=shelter_id, permission_id=73
            )
        if request.method == "GET":
            permission = UserPermission.objects.filter(
                user_id=request.user.id, shelter_id=shelter_id, permission_id=74
            )

        if permission:
            return True
        return False


class PermissionRequestAccess(BasePermission):
    def has_permission(self, request, view):
        shelter_id = view.kwargs.get("shelter_id")
        permission = True

        if request.method == "PUT":
            permission = UserPermission.objects.filter(
                user_id=request.user.id, shelter_id=shelter_id, permission_id=76
            )

        if request.method == "DELETE":
            permission = UserPermission.objects.filter(
                user_id=request.user.id, shelter_id=shelter_id, permission_id=77
            )
        if request.method == "GET":
            permission = UserPermission.objects.filter(
                user_id=request.user.id, shelter_id=shelter_id, permission_id=78
            )

        if permission:
            return True
        return False
