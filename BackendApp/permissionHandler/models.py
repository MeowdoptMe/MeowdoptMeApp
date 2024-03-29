from django.contrib.auth.models import Permission
from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save

from BackendApp import settings
from shelterRelated.models import Shelter
from userAuth.models import User

from django.db.models.signals import post_migrate
from django.contrib.auth.models import Permission
from django.dispatch import receiver


@receiver(post_migrate)
def add_custom_permission(sender, **kwargs):
    if sender.name == "permissionHandler":
        Permission.objects.get_or_create(
            codename="view_all_users", name="Can view all users data", content_type_id=6
        )


class UserPermission(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False
    )
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE, null=True)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE, null=False)

    @receiver(post_save, sender=User)
    def create_user_permission(sender, instance, created, **kwargs):
        if created:
            permission_view = Permission.objects.get(codename="view_user")
            permission_change = Permission.objects.get(codename="change_user")
            permission_delete = Permission.objects.get(codename="delete_user")
            UserPermission.objects.create(user=instance, permission=permission_view)
            UserPermission.objects.create(user=instance, permission=permission_change)
            UserPermission.objects.create(user=instance, permission=permission_delete)


class PermissionRequest(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False
    )
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE, null=False)
    group = models.CharField(max_length=255, default=None)
    created_date = models.DateField(auto_now_add=True)
