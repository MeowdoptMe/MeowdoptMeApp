from django.contrib.auth.models import Permission
from rest_framework.permissions import BasePermission
from permissionHandler.models import UserPermission


class UserManageDetailPermission(BasePermission):
    def has_permission(self, request, view):
        user_id = view.kwargs.get("pk")
        permission = False
        if user_id == request.user.id:
            if request.method == "GET":
                id = Permission.objects.get(codename="view_user")
                permission = UserPermission.objects.filter(
                    user_id=request.user.id, permission_id=id
                )

            elif request.method == "PUT":
                id = Permission.objects.get(codename="change_user")
                permission = UserPermission.objects.filter(
                    user_id=request.user.id, permission_id=id
                )

            elif request.method == "DELETE":
                id = Permission.objects.get(codename="delete_user")
                permission = UserPermission.objects.filter(
                    user_id=request.user.id, permission_id=id
                )

        if permission:
            return True
        return False


class UserManageViewPermission(BasePermission):
    def has_permission(self, request, view):
        id = Permission.objects.get(codename="view_user")
        permission = UserPermission.objects.filter(
            user_id=request.user.id, permission_id=id
        )
        if permission:
            return True
        return False
