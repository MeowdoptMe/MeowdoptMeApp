from django.db import models

from shelterRelated.models import Shelter
from photoAlbum.models import PhotoAlbum


class PetCharacteristics(models.Model):
    species = models.CharField(max_length=255)
    subSpecies = models.CharField(max_length=255)
    age = models.IntegerField()
    gender = models.CharField(max_length=255)
    color = models.CharField(max_length=255)

class Pet(models.Model):
    name = models.CharField(max_length=255)
    petCharacteristics = models.ForeignKey(PetCharacteristics, on_delete=models.CASCADE, null=False)

class Ad(models.Model):
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, null=False)
    active = models.BooleanField()
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE, null=False)
    photoAlbum = models.ForeignKey(PhotoAlbum, on_delete=models.CASCADE, null=True)

class AdFilters(models.Model):
    petCharacteristics = models.ForeignKey(PetCharacteristics, on_delete=models.CASCADE, null=False)