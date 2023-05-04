from django.db import models

from photoAlbum.models import PhotoAlbum
from userAuth.models import User


class ContactInfo(models.Model):
    email = models.CharField(max_length=255)
    phone = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    location = models.CharField(max_length=255)
    x_cord = models.FloatField(default=0)
    y_cord = models.FloatField(default=0)


class Shelter(models.Model):
    name = models.CharField(max_length=255)
    photo_album = models.ForeignKey(PhotoAlbum, on_delete=models.SET_NULL, null=True)
    contact_info = models.ForeignKey(ContactInfo, on_delete=models.SET_NULL, null=True)
