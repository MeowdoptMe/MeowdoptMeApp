from rest_framework import serializers
from .models import Pet, Ad, PetCharacteristics, DateOfBirth


class DateOfBirthSerializer(serializers.ModelSerializer):
    class Meta:
        model = DateOfBirth
        fields = ["year", "month"]


class PetCharacteristicsSerializer(serializers.ModelSerializer):
    dateOfBirth = DateOfBirthSerializer()

    class Meta:
        model = PetCharacteristics
        fields = ["species", "breed", "gender", "dateOfBirth", "color"]


class PetSerializer(serializers.ModelSerializer):
    petCharacteristics = PetCharacteristicsSerializer()

    class Meta:
        model = Pet
        fields = ["name", "petCharacteristics"]

    def create(self, validated_data):
        characteristics_data = validated_data.pop("petCharacteristics")
        date_data = characteristics_data.pop("dateOfBirth")
        date = DateOfBirth.objects.create(**date_data)
        pet_characteristics = PetCharacteristics.objects.create(
            dateOfBirth=date, **characteristics_data
        )
        pet = Pet.objects.create(
            petCharacteristics=pet_characteristics, **validated_data
        )
        return pet


class AdSerializer(serializers.ModelSerializer):
    pet = PetSerializer()

    class Meta:
        model = Ad
        fields = ["active", "shelter", "description", "pet", "photoAlbum"]

    def create(self, validated_data):
        pet_data = validated_data.pop("pet")
        characteristics_data = pet_data.pop("petCharacteristics")
        date_data = characteristics_data.pop("dateOfBirth")
        date = DateOfBirth.objects.create(**date_data)
        pet_characteristics = PetCharacteristics.objects.create(
            dateOfBirth=date, **characteristics_data
        )
        pet = Pet.objects.create(petCharacteristics=pet_characteristics, **pet_data)
        ad = Ad.objects.create(pet=pet, **validated_data)
        return ad

    def update(self, instance, validated_data):
        instance.active = validated_data["active"]
        instance.shelter = validated_data["shelter"]
        instance.description = validated_data["description"]
        instance.photoAlbum = validated_data["photoAlbum"]
        instance.save()
        return instance
