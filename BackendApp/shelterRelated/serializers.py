from rest_framework import serializers

from .models import ContactInfo, Shelter
from photoAlbum.serializers import PhotoAlbumSerializer


class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = ["email", "phone", "user", "location", "x_cord", "y_cord"]


class ShelterSerializer(serializers.ModelSerializer):
    photo_album = PhotoAlbumSerializer(read_only=True)
    contact_info = ContactInfoSerializer(read_only=True)

    class Meta:
        model = Shelter
        fields = ["name", "photo_album", "contact_info"]
