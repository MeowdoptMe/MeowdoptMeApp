import tempfile

from PIL import Image
from django.core.files.uploadedfile import SimpleUploadedFile


def create_png_file():
    image = Image.new("RGBA", (100, 100), (255, 0, 0, 255))
    temp_file = tempfile.NamedTemporaryFile(suffix=".png")
    image.save(temp_file.name, "PNG")
    file = SimpleUploadedFile(
        "test_file.png", temp_file.read(), content_type="image/png"
    )
    return file
