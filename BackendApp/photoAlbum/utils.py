import tempfile

from PIL import Image
from django.core.files.uploadedfile import SimpleUploadedFile


def create_jpg_file(id):
    image = Image.new("RGB", (100, 100), (255, 0, 0, 255))
    temp_file = tempfile.NamedTemporaryFile(suffix=".jpg")
    image.save(temp_file.name, "JPEG")
    file = SimpleUploadedFile(
        f"test_file{id}.jpg", temp_file.read(), content_type="image/jpeg"
    )
    return file
