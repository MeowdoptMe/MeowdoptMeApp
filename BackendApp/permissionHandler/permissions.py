from django.contrib.auth.models import Permission
from rest_framework.permissions import BasePermission

from .models import UserPermission, PermissionRequest


class UserPermissionAccess(BasePermission):
    def has_permission(self, request, view):
        shelter_id = view.kwargs.get("shelter_id")
        user_permission = True
        if request.method == "POST":
            permission = Permission.objects.get(codename="add_userpermission")
            user_permission = UserPermission.objects.filter(
                user=request.user, shelter_id=shelter_id, permission=permission
            )

        if request.method == "PUT":
            permission = Permission.objects.get(codename="change_userpermission")
            user_permission = UserPermission.objects.filter(
                user=request.user, shelter_id=shelter_id, permission=permission
            )

        if request.method == "DELETE":
            permission = Permission.objects.get(codename="delete_userpermission")
            user_permission = UserPermission.objects.filter(
                user=request.user, shelter_id=shelter_id, permission=permission
            )
        if request.method == "GET":
            permission = Permission.objects.get(codename="view_userpermission")
            user_permission = UserPermission.objects.filter(
                user=request.user, shelter_id=shelter_id, permission=permission
            )

        if user_permission:
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
