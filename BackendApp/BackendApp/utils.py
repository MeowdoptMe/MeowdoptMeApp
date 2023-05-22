from django.core.files.storage import default_storage


def save_file(file):
    filename = default_storage.get_available_name(file.name)
    path = default_storage.save(filename, file)
    return default_storage.path(path)
