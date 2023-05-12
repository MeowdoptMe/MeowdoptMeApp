from django.contrib.auth.models import Permission
from django.urls import reverse_lazy
from rest_framework import status
from rest_framework.test import (
    APITestCase,
    APIRequestFactory,
    force_authenticate,
    APIClient,
)

from .models import Shelter, ContactInfo, UserPermission
from .views import ShelterList, ShelterDetail, ContactInfoDetail, UserPermissionList


class UserPermissionTests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.client = APIClient()

    def test_list(self):
        url = reverse_lazy("shelter_permission_list")
        request = self.factory.get(url)
        view = UserPermissionList.as_view()
        response = view(request)
        self.assertEqual(
            response.status_code,
            200,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_create(self):
        actual_permission_count = UserPermission.objects.count()
        self.client.force_authenticate(user=self.user)
        url = reverse_lazy("shelter_permission_create")
        response = self.client.post(url, self.data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Shelter.objects.count(), actual_permission_count + 1)
        self.assertEqual(
            Shelter.objects.get(id=actual_permission_count + 1).name, self.data["name"]
        )

    def test_detail(self):
        Shelter.objects.create()
        url = reverse_lazy("shelter_permission_detail", kwargs={"pk": 1})
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
        url = reverse_lazy("shelter_permission_detail", kwargs={"pk": 1})
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
        url = reverse_lazy("shelter_permission_detail", kwargs={"pk": 1})
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
