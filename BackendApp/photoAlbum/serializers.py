from rest_framework import serializers

from .models import PhotoAlbum, Photo


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ["img"]


class PhotoAlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotoAlbum
        fields = ["name"]

    def create(self, validated_data):
        photo_album = PhotoAlbum.objects.create(**validated_data)
        return photo_album
