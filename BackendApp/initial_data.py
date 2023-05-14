from json import load
from django.contrib.auth.hashers import make_password
from userAuth.models import User


with open("initial_data.json", encoding="utf-8") as f:
    users = load(f)


def add_users(user_list):
    for user_data in user_list:
        User.objects.create(
            username=user_data["username"],
            password=make_password(user_data["password"]),
            is_superuser=user_data["is_superuser"],
        )


add_users(users)
