from rest_framework import serializers

from .models import ContactInfo, Shelter


class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = ["email", "phone", "user", "location", "x_cord", "y_cord"]


class ShelterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shelter
        fields = ["name", "photo_album", "contact_info"]
