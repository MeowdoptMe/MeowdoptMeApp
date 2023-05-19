from django.db import models

from shelterRelated.models import Shelter
from photoAlbum.models import PhotoAlbum


class Pet(models.Model):
    name = models.CharField(max_length=255, default="", null=True)
    species = models.CharField(max_length=255, default="", null=True)
    subSpecies = models.CharField(max_length=255, default="", null=True)
    age = models.IntegerField(default=0, null=True)
    gender = models.CharField(max_length=255, default="", null=True)
    color = models.CharField(max_length=255, default="", null=True)


class Ad(models.Model):
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, null=True)
    active = models.BooleanField(null=True)
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE, null=True)
    photo_album = models.ForeignKey(PhotoAlbum, on_delete=models.CASCADE, null=True)
