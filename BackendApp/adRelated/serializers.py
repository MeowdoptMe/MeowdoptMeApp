from rest_framework import serializers
from .models import Pet, Ad, PetCharacteristics, DateOfBirth

from photoAlbum.serializers import PhotoAlbumSerializer

from photoAlbum.models import Photo, PhotoAlbum


class DateOfBirthSerializer(serializers.ModelSerializer):
    class Meta:
        model = DateOfBirth
        fields = ["year", "month"]


class PetCharacteristicsSerializer(serializers.ModelSerializer):
    date_of_birth = DateOfBirthSerializer()

    class Meta:
        model = PetCharacteristics
        fields = ["species", "breed", "gender", "date_of_birth", "color"]


class PetSerializer(serializers.ModelSerializer):
    pet_characteristics = PetCharacteristicsSerializer()

    class Meta:
        model = Pet
        fields = ["name", "pet_characteristics"]

    def create(self, validated_data):
        characteristics_data = validated_data.pop("pet_characteristics")
        date_data = characteristics_data.pop("date_of_birth")
        date = DateOfBirth.objects.create(**date_data)
        pet_characteristics = PetCharacteristics.objects.create(
            date_of_birth=date, **characteristics_data
        )
        pet = Pet.objects.create(pet_characteristics=pet_characteristics, **validated_data)
        return pet


class AdSerializer(serializers.ModelSerializer):
    pet = PetSerializer()

    class Meta:
        model = Ad
        fields = ["active", "shelter", "description", "pet", "photo_album"]

    def create(self, validated_data):
        pet_data = validated_data.pop("pet")
        characteristics_data = pet_data.pop("pet_characteristics")
        date_data = characteristics_data.pop("date_of_birth")
        date = DateOfBirth.objects.create(**date_data)
        pet_characteristics = PetCharacteristics.objects.create(
            date_of_birth=date, **characteristics_data
        )
        pet = Pet.objects.create(pet_characteristics=pet_characteristics, **pet_data)
        ad = Ad.objects.create(pet=pet, **validated_data)
        return ad

    def update(self, instance, validated_data):
        instance.active = validated_data["active"]
        instance.shelter = validated_data["shelter"]
        instance.description = validated_data["description"]
        instance.photo_album = validated_data["photo_album"]
        instance.save()
        return instance
