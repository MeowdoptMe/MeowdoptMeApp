from django.contrib.auth.models import Group, Permission
from django.db import models

from BackendApp import settings
from shelterRelated.models import Shelter


class UserPermission(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False
    )
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE, null=True)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE, null=False)


class PermissionRequest(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False
    )
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE, null=False)
    group = models.CharField(max_length=255, default=None)
    created_date = models.DateField(auto_now_add=True)
