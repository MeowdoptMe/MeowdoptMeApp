from rest_framework import serializers

from .models import PhotoAlbum, Photo
class PhotoAlbumSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='photo_album_detail', read_only=True)
    class Meta:
        model=PhotoAlbum
        fields=['name', 'url']

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model=Photo
        fields=['img', 'description', 'photo_album']
