from django.contrib.auth.models import Group, Permission
from django.db import models

from BackendApp import settings
from shelterRelated.models import Shelter


class UserPermission(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False
    )
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE, null=False)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE, null=False)


class PermissionRequest(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False
    )
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE, null=False)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE, null=False)
    created_date = models.DateField(auto_now_add=True)


class Manager(Group):
    pass


class Volunteer(Group):
    pass


class ShelterWorker(Group):
    pass


class RegularUser(Group):
    pass
