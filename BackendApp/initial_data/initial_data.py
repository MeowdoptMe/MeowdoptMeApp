from django.contrib.auth.hashers import make_password
from json import load
from django.contrib.auth.models import Permission
from userAuth.models import User
from shelterRelated.models import Shelter
from permissionHandler.models import UserPermission

with open("initial_data/users.json", "r") as f:
    users = load(f)

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


def load_data():
    add_users(users)
    add_shelters(shelters)
    add_user_permissions(permissions)


load_data()
