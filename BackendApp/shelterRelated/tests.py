from django.contrib.auth.models import Permission
from django.urls import reverse_lazy
from rest_framework import status
from rest_framework.test import (
    APITestCase,
    APIRequestFactory,
    force_authenticate,
    APIClient,
)

from photoAlbum.models import PhotoAlbum
from userAuth.models import User
from .models import Shelter, ContactInfo
from .views import ShelterList, ShelterDetail, ContactInfoDetail, ShelterCreate
from userAuth.views import LoginView

from permissionHandler.models import UserPermission


class ContactInfoTests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.data = {
            "email": "tdd@gmail.com",
            "phone": "123456789",
            "user": 1,
            "location": "Polaniec, ul. Krakowska 5",
            "x_cord": 52.111,
            "y_cord": 26.752,
        }
        User.objects.create()

    def test_create(self):
        url = reverse_lazy("contact_info_create")
        response = self.factory.post(url, self.data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactInfo.objects.count(), 1)

    def test_detail(self):
        ContactInfo.objects.create()
        url = reverse_lazy("contact_info_detail", kwargs={"pk": 1})
        request = self.factory.get(url)
        view = ContactInfoDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(
            response.status_code,
            200,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_edit(self):
        ContactInfo.objects.create()
        url = reverse_lazy("contact_info_detail", kwargs={"pk": 1})
        data = self.data
        data["email"] = "xyz@gmail.com"
        request = self.factory.put(url, data)
        view = ContactInfoDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(
            response.status_code,
            200,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )
        self.assertEqual(ContactInfo.objects.get().email, self.data["email"])

    def test_remove(self):
        contact_info = ContactInfo.objects.create()
        current_objects_count = ContactInfo.objects.count()
        url = reverse_lazy("contact_info_detail", kwargs={"pk": 1})
        request = self.factory.delete(url)
        view = ContactInfoDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(
            response.status_code,
            204,
            f"Expected Response Code 204, received {response.status_code} instead.",
        )
        self.assertEqual(ContactInfo.objects.count(), current_objects_count - 1)


class ShelterTests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.client = APIClient()
        user = User.objects.create()
        info = ContactInfo.objects.create()
        album = PhotoAlbum.objects.create()
        self.data = {
            "name": "test_shelter",
            "contact_info": 1,
            "photo_album": 1,
        }
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
        shelter = Shelter.objects.create()
        permission_create = Permission.objects.get(id=48)
        permission_change = Permission.objects.get(id=49)
        permission_delete = Permission.objects.get(id=50)
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

    def test_create(self):
        actual_shelter_count = Shelter.objects.count()
        self.client.force_authenticate(user=self.user)
        url = reverse_lazy("shelter_create")
        response = self.client.post(url, self.data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Shelter.objects.count(), actual_shelter_count + 1)
        self.assertEqual(
            Shelter.objects.get(id=actual_shelter_count + 1).name, self.data["name"]
        )

    def test_detail(self):
        Shelter.objects.create()
        url = reverse_lazy("shelter_detail", kwargs={"pk": 1})
        request = self.factory.get(url)
        view = ShelterDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(
            response.status_code,
            200,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_edit(self):
        shelter = Shelter.objects.create()
        url = reverse_lazy("shelter_detail", kwargs={"pk": 1})
        data = self.data
        data["name"] = "shelter123"
        request = self.factory.put(url, data)
        force_authenticate(request, user=self.user, token=self.token)
        view = ShelterDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(
            response.status_code,
            200,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )
        self.assertEqual(Shelter.objects.get(id=1).name, data["name"])

    def test_remove(self):
        shelter = Shelter.objects.create()
        current_objects_count = Shelter.objects.count()
        url = reverse_lazy("shelter_detail", kwargs={"pk": 1})
        request = self.factory.delete(url)
        force_authenticate(request, user=self.user, token=self.token)
        view = ShelterDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(
            response.status_code,
            204,
            f"Expected Response Code 204, received {response.status_code} instead.",
        )
        self.assertEqual(Shelter.objects.count(), current_objects_count - 1)
