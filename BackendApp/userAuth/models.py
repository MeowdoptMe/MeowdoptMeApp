from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    class Meta:
        db_table = 'auth_user'

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['id', 'email', 'password', 'is_superuser',
                       'last_login', 'is_staff', 'is_active', 'date_joined']
