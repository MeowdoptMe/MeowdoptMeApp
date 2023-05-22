from django.contrib.auth.hashers import make_password
from json import load
from django.contrib.auth.models import Permission
from userAuth.models import User
from shelterRelated.models import Shelter
from permissionHandler.models import UserPermission

from BackendApp.adRelated.models import Ad
from BackendApp.photoAlbum.models import PhotoAlbum, Photo

with open("initial_data/users.json", "r", encoding="utf-8") as f:
    users = load(f)

with open("initial_data/shelters.json", "r", encoding="utf-8") as f:
    shelters = load(f)

with open("initial_data/user_permissions.json", "r", encoding="utf-8") as f:
    permissions = load(f)

with open("initial_data/ads.json", "r", encoding="utf-8") as f:
    ads = load(f)

with open("initial_data/photo_albums.json", "r", encoding="utf-8") as f:
    photo_albums = load(f)


def add_users(users):
    for user_data in users:
        User.objects.create(
            username=user_data["username"],
            password=make_password(user_data["password"]),
            is_superuser=user_data["is_superuser"],
            is_staff=user_data["is_staff"],
        )


def add_shelters(shelters):
    for shelter in shelters:
        Shelter.objects.create(
            name=shelter["name"],
            email=shelter["email"],
            phone=shelter["phone"],
            user=User.objects.get(id=shelter["user"]),
            location=shelter["location"],
            x_cord=shelter["x_cord"],
            y_cord=shelter["y_cord"],
        )


def add_user_permissions(permissions):
    for permission in permissions:
        UserPermission.objects.create(
            user=User.objects.get(id=permission["user"]),
            shelter=Shelter.objects.get(id=permission["shelter"]),
            permission=Permission.objects.get(id=permission["permission"]),
        )


def add_photo_albums(albums):
    for album in albums:
        photo_album = PhotoAlbum.objects.create(name=album["name"])
        for photo in album["photos"]:
            Photo.objects.create(dir=photo["dir"], photo_album=photo_album)


def add_ads(ads):
    for ad in ads:
        pet = ad["pet"]
        pet_characteristics = pet["pet_characteristics"]
        Ad.objects.create(
            active=ad["active"],
            shelter=ad["shelter"],
            description=ad["description"],
            pet=pet,
            photo_album=photo_album,
        )


def add_ads(shelters):
    for shelter in shelters:
        Shelter.objects.create(
            name=shelter["name"],
            email=shelter["email"],
            phone=shelter["phone"],
            user=User.objects.get(id=shelter["user"]),
            location=shelter["location"],
            x_cord=shelter["x_cord"],
            y_cord=shelter["y_cord"],
        )


def load_data():
    add_users(users)
    add_shelters(shelters)
    add_user_permissions(permissions)


load_data()
