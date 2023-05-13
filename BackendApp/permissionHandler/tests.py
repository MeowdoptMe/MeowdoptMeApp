from django.contrib.auth.models import Permission
from django.urls import reverse_lazy
from rest_framework import status
from rest_framework.test import (
    APITestCase,
    APIRequestFactory,
    force_authenticate,
    APIClient,
)

from .models import UserPermission
from shelterRelated.models import Shelter, ContactInfo
from .views import UserPermissionList, UserPermissionDetail
from userAuth.models import User
from userAuth.views import LoginView


class UserPermissionTests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.client = APIClient()
        self.data = {"user": 1, "shelter": 1, "permission": 27}
        user_data = {
            "username": "ewa",
            "password": "ewa12345",
        }
        self.user = User.objects.create_user(
            username=user_data["username"], password=user_data["password"]
        )
        url = reverse_lazy("login")
        request = self.factory.post(url, user_data, format="json")
        view = LoginView.as_view()
        response = view(request)
        self.token = response.data["access"]
        self.shelter = Shelter.objects.create()
        permission_create = Permission.objects.get(codename="add_userpermission")
        permission_change = Permission.objects.get(codename="change_userpermission")
        permission_delete = Permission.objects.get(codename="delete_userpermission")
        permission_view = Permission.objects.get(codename="view_userpermission")
        UserPermission.objects.create(
            user=self.user, shelter=self.shelter, permission=permission_create
        )
        UserPermission.objects.create(
            user=self.user, shelter=self.shelter, permission=permission_change
        )
        UserPermission.objects.create(
            user=self.user, shelter=self.shelter, permission=permission_delete
        )
        UserPermission.objects.create(
            user=self.user, shelter=self.shelter, permission=permission_view
        )

    def test_list(self):
        self.client.force_authenticate(user=self.user)
        url = reverse_lazy("shelter_permission_list", kwargs={"shelter_id": 1})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_create(self):
        actual_permission_count = UserPermission.objects.count()
        self.client.force_authenticate(user=self.user)
        url = reverse_lazy("shelter_permission_create", kwargs={"shelter_id": 1})
        response = self.client.post(url, self.data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(UserPermission.objects.count(), actual_permission_count + 1)
        self.assertEqual(
            UserPermission.objects.get(id=actual_permission_count + 1).user, self.user
        )

    def test_detail(self):
        Shelter.objects.create()
        self.client.force_authenticate(user=self.user)
        url = reverse_lazy(
            "shelter_permission_detail", kwargs={"shelter_id": 1, "pk": 1}
        )
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_edit(self):
        self.client.force_authenticate(user=self.user)
        url = reverse_lazy(
            "shelter_permission_detail", kwargs={"shelter_id": 1, "pk": 1}
        )
        data = self.data
        data["permission"] = 2
        response = self.client.put(url, data)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )
        self.assertEqual(
            UserPermission.objects.get(id=1).permission.id, data["permission"]
        )

    def test_remove(self):
        current_objects_count = UserPermission.objects.count()
        self.client.force_authenticate(user=self.user)
        url = reverse_lazy(
            "shelter_permission_detail", kwargs={"shelter_id": 1, "pk": 1}
        )
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            f"Expected Response Code 204, received {response.status_code} instead.",
        )
        self.assertEqual(UserPermission.objects.count(), current_objects_count - 1)
