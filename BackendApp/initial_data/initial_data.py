from django.contrib.auth.hashers import make_password
from json import load
from django.contrib.auth.models import Permission
from userAuth.models import User
from shelterRelated.models import ContactInfo
from photoAlbum.models import PhotoAlbum
from shelterRelated.models import Shelter
from permissionHandler.models import UserPermission

with open("initial_data/users.json", "r") as f:
    users = load(f)

with open("initial_data/photo_albums.json", "r") as f:
    photo_albums = load(f)

with open("initial_data/contact_infos.json", "r") as f:
    contact_infos = load(f)

with open("initial_data/shelters.json", "r") as f:
    shelters = load(f)

with open("initial_data/user_permissions.json", "r") as f:
    permissions = load(f)


def add_users(users):
    for user_data in users:
        User.objects.create(
            username=user_data["username"],
            password=make_password(user_data["password"]),
            is_superuser=user_data["is_superuser"],
        )


def add_contact_infos(contact_infos):
    for info in contact_infos:
        ContactInfo.objects.create(
            email=info["email"],
            phone=info["phone"],
            user=User.objects.get(id=info["user"]),
            location=info["location"],
            x_cord=info["x_cord"],
            y_cord=info["y_cord"],
        )


def add_photo_albums(photo_albums):
    for album in photo_albums:
        PhotoAlbum.objects.create(name=album["name"])


def add_shelters(shelters):
    for shelter in shelters:
        Shelter.objects.create(
            name=shelter["name"],
            contact_info=ContactInfo.objects.get(id=shelter["contact_info"]),
            photo_album=PhotoAlbum.objects.get(id=shelter["photo_album"]),
        )


def add_user_permissions(permissions):
    for permission in permissions:
        UserPermission.objects.create(
            user=User.objects.get(id=permission["user"]),
            shelter=Shelter.objects.get(id=permission["shelter"]),
            permission=Permission.objects.get(id=permission["permission"]),
        )


def load_data():
    add_users(users)
    add_photo_albums(photo_albums)
    add_contact_infos(contact_infos)
    add_shelters(shelters)
    add_user_permissions(permissions)


load_data()
