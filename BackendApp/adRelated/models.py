from django.db import models

from shelterRelated.models import Shelter
from photoAlbum.models import PhotoAlbum


class Pet(models.Model):
    name = models.CharField(max_length=255, default="")
    species = models.CharField(max_length=255, default="")
    subSpecies = models.CharField(max_length=255, default="")
    age = models.IntegerField(default=0)
    gender = models.CharField(max_length=255, default="")
    color = models.CharField(max_length=255, default="")


class Ad(models.Model):
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, null=False)
    active = models.BooleanField()
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE, null=False)
    photo_album = models.ForeignKey(PhotoAlbum, on_delete=models.CASCADE, null=True)
