from django.contrib.auth.models import Permission
from rest_framework.permissions import BasePermission
from permissionHandler.models import UserPermission
from .models import PhotoAlbum, Photo
from adRelated.models import Ad


class PhotoPermission(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_staff or not request.user.is_superuser:
            if "Create" not in view.__class__.__name__:
                photo = view.get_object()
                ad = Ad.objects.get(photoAlbum=photo.photo_album)

            permission = True
            if request.method == "POST":
                photo_album = PhotoAlbum.objects.get(id=view.kwargs.get("id"))
                ad = Ad.objects.get(photoAlbum=photo_album)
                id = Permission.objects.get(codename="add_ad")
                permission = UserPermission.objects.filter(
                    user_id=request.user.id,
                    shelter=ad.shelter,
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
        return True


class PhotoAlbumPermission(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_staff or not request.user.is_superuser:
            permission = True

            if request.method == "PUT":
                photo_album = view.get_object()
                ad = Ad.objects.get(photoAlbum=photo_album)
                id = Permission.objects.get(codename="change_ad")
                permission = UserPermission.objects.filter(
                    user_id=request.user.id, shelter=ad.shelter, permission_id=id
                )

            if request.method == "DELETE":
                photo_album = view.get_object()
                ad = Ad.objects.get(photoAlbum=photo_album)
                id = Permission.objects.get(codename="delete_ad")
                permission = UserPermission.objects.filter(
                    user_id=request.user.id, shelter=ad.shelter, permission_id=id
                )
            if permission:
                return True
            return False
        return True
