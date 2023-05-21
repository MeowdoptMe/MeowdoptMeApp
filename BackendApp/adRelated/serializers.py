from rest_framework import serializers
from .models import Pet, Ad, PetCharacteristics, DateOfBirth


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
    petCharacteristics = PetCharacteristicsSerializer()

    class Meta:
        model = Pet
        fields = ["name", "petCharacteristics"]


class AdSerializer(serializers.ModelSerializer):
    pet = PetSerializer()

    class Meta:
        model = Ad
        fields = ["pet", "active", "shelter"]

    def create(self, validated_data):
        pet_data = validated_data.pop("pet")
        characteristics_data = pet_data.pop("petCharacteristics")
        date_data = characteristics_data.pop("date_of_birth")
        date = DateOfBirth.objects.create(**date_data)
        petCh = PetCharacteristics.objects.create(
            date_of_birth=date, **characteristics_data
        )
        pet = Pet.objects.create(petCharacteristics=petCh, **pet_data)
        ad = Ad.objects.create(pet=pet, **validated_data)

        return ad
