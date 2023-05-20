from django.contrib.auth.models import Permission
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory, APIClient
from photoAlbum.models import PhotoAlbum
from shelterRelated.models import Shelter
from .models import Pet, Ad, DateOfBirth, PetCharacteristics
from .views import PetList, PetDetail, AdList, AdDetail
from userAuth.models import User
from permissionHandler.models import UserPermission


class AdTests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.client = APIClient()
        DateOfBirth.objects.create()
        PetCharacteristics.objects.create()
        self.pet = Pet.objects.create()

        self.data = {
            "pet": 1,
            "active": False,
            "shelter": 1,
            "photo_album": 1,
        }
        self.user = User.objects.create_user(username="ewa", password="ewa12345")
        self.user2 = User.objects.create_user(username="gocha", password="gocha12345")
        self.shelter = Shelter.objects.create()

        self.album = PhotoAlbum.objects.create()
        permission_create = Permission.objects.get(codename="add_ad")
        permission_change = Permission.objects.get(codename="change_ad")
        permission_delete = Permission.objects.get(codename="delete_ad")
        UserPermission.objects.create(
            user=self.user, shelter=self.shelter, permission=permission_create
        )
        UserPermission.objects.create(
            user=self.user, shelter=self.shelter, permission=permission_change
        )
        UserPermission.objects.create(
            user=self.user, shelter=self.shelter, permission=permission_delete
        )

    def test_list(self):
        url = reverse("ad_list")
        request = self.factory.get(url)
        view = AdList.as_view()
        response = view(request)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_create(self):
        self.client.force_authenticate(user=self.user)
        url = reverse("ad_create")
        response = self.client.post(url, self.data, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            f"Expected Response Code 201, received {response.status_code} instead.",
        )
        self.assertEqual(Ad.objects.count(), 1)
        self.assertEqual(Ad.objects.get().pet.id, self.data["pet"])

    def test_detail(self):
        Ad.objects.create()
        self.client.force_authenticate(user=self.user)
        url = reverse("ad_detail", kwargs={"pk": 1})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_edit(self):
        Ad.objects.create(
            pet=self.pet, active=1, shelter=self.shelter, photo_album=self.album
        )
        self.client.force_authenticate(user=self.user)
        url = reverse("ad_detail", kwargs={"pk": 1})
        data = self.data
        data["active"] = False
        response = self.client.put(url, data)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )
        self.assertEqual(Ad.objects.get().active, data["active"])

    def test_remove(self):
        Ad.objects.create(
            pet=self.pet, active=1, shelter=self.shelter, photo_album=self.album
        )
        current_objects_count = Ad.objects.count()
        self.client.force_authenticate(user=self.user)
        url = reverse("ad_detail", kwargs={"pk": 1})
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            f"Expected Response Code 204, received {response.status_code} instead.",
        )
        self.assertEqual(Ad.objects.count(), current_objects_count - 1)


class PetTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.data = {
            "name": "karolinka",
            "species": "pies",
            "subSpecies": "labrador",
            "age": 2,
            "gender": "suka",
            "color": "czarny",
        }
        self.user = User.objects.create_user(username="ewa", password="ewa12345")
        self.user2 = User.objects.create_user(username="gocha", password="gocha12345")
        shelter = Shelter.objects.create()
        permission_create = Permission.objects.get(codename="add_ad")
        permission_change = Permission.objects.get(codename="change_ad")
        permission_delete = Permission.objects.get(codename="delete_ad")
        UserPermission.objects.create(
            user=self.user, shelter=shelter, permission=permission_create
        )
        UserPermission.objects.create(
            user=self.user, shelter=shelter, permission=permission_change
        )
        UserPermission.objects.create(
            user=self.user, shelter=shelter, permission=permission_delete
        )
        album = PhotoAlbum.objects.create()
        pet = Pet.objects.create(
            name="cat1"
        )
        Ad.objects.create(pet=pet, active=False, shelter=shelter, photo_album=album)

    def test_create(self):
        self.client.force_authenticate(user=self.user)
        url = reverse("pet_create", kwargs={"pk": 1})
        response = self.client.post(url, self.data, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            f"Expected Response Code 201, received {response.status_code} instead.",
        )
        self.assertEqual(Pet.objects.count(), 2)
        self.assertEqual(Pet.objects.get(id=2).name, self.data["name"])
        self.assertEqual(Ad.objects.get(id=1).pet.name, self.data["name"])

    def test_detail(self):
        Pet.objects.create()
        url = reverse("pet_detail", kwargs={"pk": 1})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )
