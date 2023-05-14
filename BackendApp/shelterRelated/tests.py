from django.contrib.auth.models import Permission
from django.urls import reverse_lazy
from rest_framework import status
from rest_framework.test import (
    APITestCase,
    APIRequestFactory,
    force_authenticate,
    APIClient,
)

from userAuth.models import User
from .models import Shelter
from .views import ShelterList, ShelterDetail
from userAuth.views import LoginView

from permissionHandler.models import UserPermission


class ShelterTests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.client = APIClient()
        user = User.objects.create()
        self.data = {
            "name": "test_shelter",
            "email": "admin@gmail.com",
            "phone": "123456789",
            "user": 1,
            "location": "Polaniec, ul. Krakowska 5",
            "x_cord": 52.111,
            "y_cord": 26.752,
        }
        self.user = User.objects.create_user(username="ewa", password="ewa12345")
        self.user2 = User.objects.create_user(username="gocha", password="gocha12345")
        shelter = Shelter.objects.create()
        permission_create = Permission.objects.get(codename="add_shelter")
        permission_change = Permission.objects.get(codename="change_shelter")
        permission_delete = Permission.objects.get(codename="delete_shelter")
        UserPermission.objects.create(
            user=self.user, shelter=shelter, permission=permission_create
        )
        UserPermission.objects.create(
            user=self.user, shelter=shelter, permission=permission_change
        )
        UserPermission.objects.create(
            user=self.user, shelter=shelter, permission=permission_delete
        )

    def test_list(self):
        url = reverse_lazy("shelter_list")
        request = self.factory.get(url)
        view = ShelterList.as_view()
        response = view(request)
        self.assertEqual(
            response.status_code,
            200,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_create_with_auth(self):
        actual_shelter_count = Shelter.objects.count()
        self.client.force_authenticate(user=self.user)
        url = reverse_lazy("shelter_create")
        response = self.client.post(url, self.data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, f"Expected Response Code 201, received {response.status_code} instead.",)
        self.assertEqual(Shelter.objects.count(), actual_shelter_count + 1)
        self.assertEqual(
            Shelter.objects.get(id=actual_shelter_count + 1).name, self.data["name"]
        )
    def test_create_with_no_auth(self):
        actual_shelter_count = Shelter.objects.count()
        self.client.force_authenticate(user=self.user2)
        url = reverse_lazy("shelter_create")
        response = self.client.post(url, self.data, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN, f"Expected Response Code 403, received {response.status_code} instead.",)
        self.assertEqual(Shelter.objects.count(), actual_shelter_count)
    def test_detail_with_auth(self):
        self.client.force_authenticate(user=self.user)
        Shelter.objects.create()
        url = reverse_lazy("shelter_detail", kwargs={"pk": 1})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )
    def test_detail_with_no_auth(self):
        self.client.force_authenticate(user=self.user2)
        Shelter.objects.create()
        url = reverse_lazy("shelter_detail", kwargs={"pk": 1})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_edit_with_auth(self):
        self.client.force_authenticate(user=self.user)
        Shelter.objects.create()
        url = reverse_lazy("shelter_detail", kwargs={"pk": 1})
        data = {}
        data["name"] = "shelter123"
        response = self.client.put(url, data)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )
        self.assertNotEquals(Shelter.objects.get(id=1).name, self.data["name"])
    def test_edit_with_no_auth(self):
        self.client.force_authenticate(user=self.user2)
        Shelter.objects.create()
        url = reverse_lazy("shelter_detail", kwargs={"pk": 1})
        data = {}
        data["name"] = "shelter123"
        response = self.client.put(url, data)
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            f"Expected Response Code 403, received {response.status_code} instead.",
        )
        self.assertEquals(Shelter.objects.get(id=1).name, "")

    def test_remove_with_auth(self):
        self.client.force_authenticate(user=self.user)
        Shelter.objects.create()
        current_objects_count = Shelter.objects.count()
        url = reverse_lazy("shelter_detail", kwargs={"pk": 1})
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            f"Expected Response Code 204, received {response.status_code} instead.",
        )
        self.assertEqual(Shelter.objects.count(), current_objects_count - 1)
    def test_remove_with_no_auth(self):
        self.client.force_authenticate(user=self.user2)
        Shelter.objects.create()
        current_objects_count = Shelter.objects.count()
        url = reverse_lazy("shelter_detail", kwargs={"pk": 1})
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            f"Expected Response Code 403, received {response.status_code} instead.",
        )
        self.assertEqual(Shelter.objects.count(), current_objects_count)
