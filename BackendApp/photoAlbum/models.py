from django.db import models

class PhotoAlbum(models.Model):
    name = models.CharField(max_length=255)

class Photo(models.Model):
    img = models.CharField(max_length=255)
    description = models.TextField()
    photo_album = models.ForeignKey(PhotoAlbum, related_name='photos', on_delete=models.CASCADE, null=False)
