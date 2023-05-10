from rest_framework import serializers

from .models import PhotoAlbum, Photo


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ["img", "description"]


class PhotoAlbumSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)

    class Meta:
        model = PhotoAlbum
        fields = ["name", "photos"]
