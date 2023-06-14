from django.contrib.auth.models import Permission
from rest_framework.permissions import BasePermission
from permissionHandler.models import UserPermission


class UserManageDetailPermission(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_staff or not request.user.is_superuser:
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
        return


class UserManageViewPermission(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_staff or not request.user.is_superuser:
            id = Permission.objects.get(codename="view_all_users")
            permission = UserPermission.objects.filter(
                user_id=request.user.id, permission_id=id
            )
            if permission:
                return True
            return False
        return True
