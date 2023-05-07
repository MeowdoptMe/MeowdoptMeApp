from userAuth.models import User
from django.contrib.auth.hashers import make_password

users = [
    {'username': 'admin', 'password': 'admin', 'email': 'admin@gmail.com', 'is_superuser': 1},
    {'username': 'gocha', 'password': 'gocha', 'email': 'gocha@gmail.com'},
    {'username': 'ewa', 'password': 'ewa', 'email': 'ewa@gmail.com'},
]

def add_users(users):
    for user_data in users:
        user = User.objects.create(
            username=user_data['username'],
            password=make_password(user_data['password']),
            is_superuser=user_data['is_superuser'],
        )


add_users(users)
