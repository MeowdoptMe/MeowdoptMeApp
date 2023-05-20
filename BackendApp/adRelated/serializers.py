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
    pet = PetSerializer(required=False)

    class Meta:
        model = Ad
        fields = ["pet", "active", "shelter", "photo_album"]
