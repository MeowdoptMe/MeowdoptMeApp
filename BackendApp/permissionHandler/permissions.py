from django.contrib.auth.models import Permission

from rest_framework.permissions import BasePermission

from .models import UserPermission, PermissionRequest


Permission.objects.create(
        codename="view_all_users",
        name='Can view all users data',
        content_type_id=6
)



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
        "add_ad",
        "change_ad",
        "delete_ad",
        "view_user",
        "add_user",
        "change_user",
        "delete_user",
    ]
    shelter_worker_permissions = [
        "change_shelter",
        "view_userpermission",
        "delete_permissionrequest",
        "view_permissionrequest",
        "add_ad",
        "change_ad",
        "delete_ad",
        "view_user",
    ]
    volunteer_permissions = [
        "view_userpermission",
        "view_permissionrequest",
        "add_ad",
        "change_ad",
        "view_user",
    ]
    all_user_view_permission = "view_all_users"

    def has_permission(self, request, view):
        request_id = view.kwargs.get("pk")
        url_path = request.path

        user_permission = True
        if view.__class__.__name__ == "PermissionRequestResolve":
            permission_request = PermissionRequest.objects.get(id=request_id)
            permission = Permission.objects.get(codename="change_permissionrequest")
            user_permission = UserPermission.objects.filter(
                user=request.user,
                shelter_id=permission_request.shelter,
                permission_id=permission,
            )

        elif view.__class__.__name__ == "PermissionRequestList":
            permission = Permission.objects.get(codename="view_permissionrequest")
            user_permission = UserPermission.objects.filter(
                permission=permission, user=request.user
            )

        elif request.method == "DELETE":
            permission_request = PermissionRequest.objects.get(id=request_id)
            permission = Permission.objects.get(codename="delete_permissionrequest")
            user_permission = UserPermission.objects.filter(
                user=request.user,
                shelter_id=permission_request.shelter,
                permission_id=permission,
            )

        elif request.method == "GET":
            permission_request = PermissionRequest.objects.get(id=request_id)
            permission = Permission.objects.get(codename="view_permissionrequest")
            user_permission = UserPermission.objects.filter(
                user=request.user,
                shelter=permission_request.shelter,
                permission_id=permission,
            )

        if user_permission:
            return True
        return False
