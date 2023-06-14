import tempfile
from uuid import uuid4

from PIL import Image
from django.core.files.uploadedfile import SimpleUploadedFile

from os import remove


def create_jpg_file(id):
    image = Image.new("RGB", (100, 100), (255, 0, 0, 255))
    temp_file = tempfile.NamedTemporaryFile(suffix=".jpg")
    image.save(temp_file.name, "JPEG")
    file = SimpleUploadedFile(
        f"test_file{id}.jpg", temp_file.read(), content_type="image/jpeg"
    )
    return file


def convert_to_jpg(image_field):
    media_path = "/home/gocha/apka/BackendApp/media/"
    old_filename = f"{media_path}{image_field.name}"
    image = Image.open(old_filename)
    image = image.convert("RGB")
    jpg_path = f"{media_path}photos/{str(uuid4())}.jpg"
    image.save(jpg_path, "JPEG")
    remove(old_filename)
    return image
