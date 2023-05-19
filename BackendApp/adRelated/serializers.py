from rest_framework import serializers
from .models import Pet, Ad


class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = ["name", "species", "subSpecies", "age", "gender", "color"]



class AdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ad
        fields = ["pet", "active", "shelter", "photo_album"]