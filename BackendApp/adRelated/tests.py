from django.contrib.auth.models import Permission
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from shelterRelated.models import Shelter
from .models import Pet, Ad, DateOfBirth, PetCharacteristics
from userAuth.models import User
from permissionHandler.models import UserPermission

from photoAlbum.models import PhotoAlbum


class AdTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        date_of_birth = DateOfBirth.objects.create()
        pet_char = PetCharacteristics.objects.create(dateOfBirth=date_of_birth)
        self.pet = Pet.objects.create(petCharacteristics=pet_char)
        self.shelter = Shelter.objects.create()
        PhotoAlbum.objects.create()
        self.data = {
            "active": True,
            "shelter": 1,
            "description": "Jarzyna to pies, który trafił do nas wychudzony i schorowany, jednak dzięki właściwej opiece, stanęła na nogi. Jest wulkanem energii, świetnie chodzi na smyczy, uwielbia kontakt z ludźmi. Najlepiej odnajdzie się w domu z ogrodem.",
            "pet": {
                "name": "Jarzyna",
                "petCharacteristics": {
                    "species": "dog",
                    "breed": "Labrador Retriever mix",
                    "gender": "female",
                    "dateOfBirth": {"year": 2019, "month": 5},
                    "color": "white",
                },
            },
            "photoAlbum": 1,
        }
        self.user = User.objects.create_user(username="ewa", password="ewa12345")
        self.user2 = User.objects.create_user(username="gocha", password="gocha12345")

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
        response = self.client.get(url)
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
        self.assertEqual(Ad.objects.get().pet.name, self.data["pet"]["name"])

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
        Ad.objects.create(pet=self.pet, active=1, shelter=self.shelter)
        self.client.force_authenticate(user=self.user)
        url = reverse("ad_detail", kwargs={"pk": 1})
        data = self.data
        data["pet"]["name"] = False
        response = self.client.put(url, data, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )
        self.assertEqual(Ad.objects.get().pet.name, data["pet"]["name"])

    def test_remove(self):
        Ad.objects.create(pet=self.pet, active=1, shelter=self.shelter)
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
            "name": "string",
            "petCharacteristics": {
                "species": "string",
                "breed": "string",
                "gender": "string",
                "dateOfBirth": {"year": 0, "month": 0},
                "color": "string",
            },
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
        pet = Pet.objects.create(name="cat1")
        Ad.objects.create(pet=pet, active=False, shelter=shelter)

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


class AdFiltersTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse("ad_list")
        date_of_birth = DateOfBirth.objects.create(year=2019, month=5)
        pet_char = PetCharacteristics.objects.create(
            species="dog",
            breed="mixed breed",
            gender="female",
            color="white",
            dateOfBirth=date_of_birth,
        )
        Pet.objects.create(name="Jarzyna", petCharacteristics=pet_char)
        shelter = Shelter.objects.create()
        PhotoAlbum.objects.create()
        Ad.objects.create(
            active=True,
            shelter=shelter,
            description="Jarzyna to pies, który trafił do nas wychudzony i schorowany, jednak dzięki właściwej opiece, stanęła na nogi. Jest wulkanem energii, świetnie chodzi na smyczy, uwielbia kontakt z ludźmi. Najlepiej odnajdzie się w domu z ogrodem.",
            pet_id=1,
            photoAlbum_id=1,
        )

    def test_queryset_exist(self):
        url = f"{self.url}?species=dog&breed=mixed+breed&gender=female&year=2019&month=5&color=white"
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )
        self.assertEqual(response.data[0]["shelter"], 1)

    def test_queryset_not_exist(self):
        url = f"{self.url}?species=dog&breed=mixed+breed&gender=female&year=2021&month=2&color=white"
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )
        with self.assertRaises(IndexError):
            result = response.data[0]["shelter"]
