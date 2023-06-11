from rest_framework import serializers

from .models import PhotoAlbum, Photo


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ["img", "description"]


class PhotoAlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotoAlbum
        fields = "__all__"

    def create(self, validated_data):
        photo_album = PhotoAlbum.objects.create(**validated_data)
        return photo_album
