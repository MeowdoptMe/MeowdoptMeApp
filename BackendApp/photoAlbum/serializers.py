from rest_framework import serializers

from .models import PhotoAlbum, Photo


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ["id", "img", "description", "photo_album"]

    def create(self, validated_data):
        validated_data["photo_album"] = PhotoAlbum.objects.get(
            id=self.context.get("photo_album")
        )
        return Photo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        if "description" in validated_data:
            instance.description = validated_data["description"]
        if "img" in validated_data:
            instance.img = validated_data["img"]
        instance.save()
        return instance

    def get_fields(self):
        fields = super().get_fields()
        fields["img"].required = False
        fields["description"].required = False
        return fields


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
