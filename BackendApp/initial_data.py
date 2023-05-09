from userAuth.models import User
from django.contrib.auth.hashers import make_password
from json import load

with open('initial_data.json', 'r') as f:
    users = load(f)

def add_users(users):
    for user_data in users:
        user = User.objects.create(
            username=user_data['username'],
            password=make_password(user_data['password']),
            is_superuser=user_data['is_superuser'],
        )


add_users(users)
