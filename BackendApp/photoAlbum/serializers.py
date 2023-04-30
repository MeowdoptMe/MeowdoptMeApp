from rest_framework import serializers
from .models import PhotoAlbum, Photo
class PhotoAlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model=PhotoAlbum
        fields=['name']

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model=Photo
        fields=['img', 'description', 'photo_album']