from shelterRelated.models import Shelter
from permissionHandler.models import UserPermission
from userAuth.models import User
from django.contrib.auth.hashers import make_password


def add_admin_user_to_shelter(username, password, shelter_id):
    new_user = User.objects.create(
        username=username,
        password=make_password(password),
        is_superuser=True,
        is_staff=True,
    )
    shelter = Shelter.objects.get(id=shelter_id)
    for i in range(21, 62):
        UserPermission.objects.create(
            user=new_user,
            shelter=shelter,
            permission_id=i,
        )
