from django.db import models


class PhotoAlbum(models.Model):
    pass


class Photo(models.Model):
    img = models.ImageField(upload_to="photos")
    description = models.TextField(null=True)
    photo_album = models.ForeignKey(
        PhotoAlbum, related_name="photos", on_delete=models.CASCADE, null=True
    )
