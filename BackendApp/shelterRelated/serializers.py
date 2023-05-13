from rest_framework import serializers

from .models import Shelter


class ShelterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Shelter
        fields = ["name", "email", "phone", "user", "location", "x_cord", "y_cord"]
