from django.db import models

from shelterRelated.models import Shelter


class DateOfBirth(models.Model):
    year = models.IntegerField(null=True)
    month = models.IntegerField(null=True)


class PetCharacteristics(models.Model):
    species = models.CharField(max_length=255, default="", null=True)
    breed = models.CharField(max_length=255, default="", null=True)
    gender = models.CharField(max_length=255, default="", null=True)
    date_of_birth = models.ForeignKey(DateOfBirth, on_delete=models.CASCADE, null=True)
    color = models.CharField(max_length=255, default="", null=True)


class Pet(models.Model):
    name = models.CharField(max_length=255, default="", null=True)
    petCharacteristics = models.ForeignKey(
        PetCharacteristics, on_delete=models.CASCADE, null=True
    )


class Ad(models.Model):
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, null=True)
    active = models.BooleanField(null=True)
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE, null=True)
