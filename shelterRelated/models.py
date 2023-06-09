from django.db import models
from userAuth.models import User


class Shelter(models.Model):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, null=True)
    phone = models.IntegerField(null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    location = models.CharField(max_length=255, null=True)
    x_cord = models.FloatField(default=0, null=True)
    y_cord = models.FloatField(default=0, null=True)
