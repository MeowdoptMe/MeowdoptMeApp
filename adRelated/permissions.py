from django.contrib.auth.models import Permission
from rest_framework.permissions import BasePermission
from permissionHandler.models import UserPermission
from .models import Ad


class AdRelatedPermission(BasePermission):
    def has_permission(self, request, view):
        if "Create" not in view.__class__.__name__:
            ad = view.get_object()
            if "Pet" in view.__class__.__name__:
                pet = view.get_object()
                ad = Ad.objects.get(pet=pet)
        permission = True
        if request.method == "POST":
            id = Permission.objects.get(codename="add_ad")
            if "Pet" in view.__class__.__name__:
                ad = Ad.objects.get(id=view.kwargs.get("pk"))
                permission = UserPermission.objects.filter(
                    user_id=request.user.id, shelter=ad.shelter, permission_id=id
                )
            else:
                permission = UserPermission.objects.filter(
                    user_id=request.user.id,
                    shelter=request.data.get("shelter"),
                    permission_id=id,
                )

        if request.method == "PUT":
            id = Permission.objects.get(codename="change_ad")
            permission = UserPermission.objects.filter(
                user_id=request.user.id, shelter=ad.shelter, permission_id=id
            )

        if request.method == "DELETE":
            id = Permission.objects.get(codename="delete_ad")
            permission = UserPermission.objects.filter(
                user_id=request.user.id, shelter=ad.shelter, permission_id=id
            )

        if permission:
            return True
        return False
