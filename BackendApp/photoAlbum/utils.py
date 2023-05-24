from django.core.files.storage import FileSystemStorage
from os.path import splitext


def save_file(self, file):
    file_path = "media/photos/{}".format(file.name)
    with open(file_path, "wb") as destination:
        for chunk in file.chunks():
            destination.write(chunk)
    return file_path


def is_valid_file(file):
    allowed_extensions = [".jpg", ".png"]
    file_extension = splitext(file.name)[1].lower()
    return file_extension in allowed_extensions
