from django.db import models
from django.contrib.auth.models import Permission

from userAuth.models import User
from shelterRelated.models import Shelter

class PermissionRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    shelter = models.ForeignKey(Shelter, on_delete=models.SET_NULL, null=True)
    permission_type = models.ForeignKey(Permission, on_delete=models.SET_NULL, null=True)
