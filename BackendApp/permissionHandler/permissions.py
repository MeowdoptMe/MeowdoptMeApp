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
    manager_permissions = [
        "add_shelter",
        "change_shelter",
        "delete_shelter",
        "change_userpermission",
        "delete_userpermission",
        "view_userpermission",
        "delete_permissionrequest",
        "view_permissionrequest",
        "change_permissionrequest",
    ]
    shelter_worker_permissions = [
        "change_shelter",
        "view_userpermission",
        "delete_permissionrequest",
        "view_permissionrequest",
    ]
    volunteer_permissions = [
        "view_userpermission",
        "view_permissionrequest",
    ]

    def has_permission(self, request, view):
        shelter_id = view.kwargs.get("shelter_id")

        user_permission = True
        if view.__class__.__name__ == "PermissionRequestResolve":
            permission = Permission.objects.get(codename="change_permissionrequest")
            user_permission = UserPermission.objects.filter(
                user=request.user, shelter_id=shelter_id, permission_id=permission
            )

        if request.method == "DELETE":
            permission = Permission.objects.get(codename="delete_permissionrequest")
            user_permission = UserPermission.objects.filter(
                user=request.user, shelter_id=shelter_id, permission_id=permission
            )
        if request.method == "GET":
            permission = Permission.objects.get(codename="view_permissionrequest")
            user_permission = UserPermission.objects.filter(
                user=request.user, shelter_id=shelter_id, permission_id=permission
            )

        if user_permission:
            return True
        return False
