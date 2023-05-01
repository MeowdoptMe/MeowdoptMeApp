from django.db import models

from shelterRelated.models import Shelter
from photoAlbum.models import PhotoAlbum

class Pet(models.Model):
    name = models.CharField(max_length=255)
    species = models.CharField(max_length=255)
    subSpecies = models.CharField(max_length=255)
    age = models.IntegerField()
    gender = models.CharField(max_length=255)
    color = models.CharField(max_length=255)

class Ad(models.Model):
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, null=False)
    active = models.BooleanField()
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE, null=False)
    photo_album = models.ForeignKey(PhotoAlbum, on_delete=models.CASCADE, null=True)
    share_link = models.CharField(max_length=255)
