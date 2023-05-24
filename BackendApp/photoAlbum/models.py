from django.db import models

from photoAlbum.utils import is_valid_file, save_file


class PhotoAlbum(models.Model):
    name = models.CharField(max_length=255)


class Photo(models.Model):
    img = models.ImageField(upload_to="photos")
    photo_album = models.ForeignKey(
        PhotoAlbum, related_name="photos", on_delete=models.CASCADE, null=True
    )

    def process_file(self, file):
        if not is_valid_file(file):
            raise ValueError("Invalid file")
        file_path = save_file(file)
        return file_path
