from django.db import models


class PhotoAlbum(models.Model):
    name = models.CharField(max_length=255)


class Photo(models.Model):
    dir = models.CharField(max_length=255)
    photo_album = models.ForeignKey(
        PhotoAlbum, related_name="photos", on_delete=models.CASCADE, null=True
    )
