from rest_framework import serializers
from .models import PhotoAlbum
class PhotoAlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model=PhotoAlbum
        fields=['name']