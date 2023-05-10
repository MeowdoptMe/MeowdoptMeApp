from django.db import models

from photoAlbum.models import PhotoAlbum
from userAuth.models import User


class ContactInfo(models.Model):
    email = models.CharField(max_length=255, null=True)
    phone = models.IntegerField(null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    location = models.CharField(max_length=255, null=True)
    x_cord = models.FloatField(default=0, null=True)
    y_cord = models.FloatField(default=0, null=True)


class Shelter(models.Model):
    name = models.CharField(max_length=255)
    photo_album = models.ForeignKey(PhotoAlbum, on_delete=models.SET_NULL, null=True)
    contact_info = models.ForeignKey(ContactInfo, on_delete=models.SET_NULL, null=True)
