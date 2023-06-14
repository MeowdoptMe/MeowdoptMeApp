from rest_framework import serializers

from .models import PhotoAlbum, Photo


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ["id", "img", "description"]


class PhotoInAlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ["id"]


class PhotoAlbumSerializer(serializers.ModelSerializer):
    photos = PhotoInAlbumSerializer(many=True, read_only=True)

    class Meta:
        model = PhotoAlbum
        fields = ["id", "photos"]

    def create(self, validated_data):
        return PhotoAlbum.objects.create(**validated_data)
