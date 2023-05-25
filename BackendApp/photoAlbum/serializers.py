from rest_framework import serializers

from .models import PhotoAlbum, Photo


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ["img"]


class PhotoAlbumSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True)

    class Meta:
        model = PhotoAlbum
        fields = ["name", "photos"]

    def create(self, validated_data):
        photos_data = validated_data.pop("photos")
        photo_album = PhotoAlbum.objects.create(**validated_data)
        for photo in photos_data:
            Photo.objects.create(photo_album=photo_album, **photo)
        return photo_album
