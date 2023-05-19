from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory
from photoAlbum.models import PhotoAlbum
from shelterRelated.models import Shelter
from .models import Pet, Ad
from .views import PetList, PetDetail, AdList, AdDetail


class AdTests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        pet = Pet.objects.create()
        shelter = Shelter.objects.create()
        album = PhotoAlbum.objects.create()
        self.data = {
            "pet": 1,
            "active": False,
            "shelter": 1,
            "photo_album": 1,
        }

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
        url = reverse("ad_create")
        response = self.client.post(url, self.data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, f"Expected Response Code 201, received {response.status_code} instead.",)
        self.assertEqual(Ad.objects.count(), 1)
        self.assertEqual(Ad.objects.get().pet.id, self.data["pet"])

    def test_detail(self):
        Ad.objects.create()
        url = reverse("ad_detail", kwargs={"pk": 1})
        request = self.factory.get(url)
        view = AdDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(
            response.status_code,
            200,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_edit(self):
        Ad.objects.create(active=True)
        url = reverse("ad_detail", kwargs={"pk": 1})
        data = self.data
        data["active"] = False
        request = self.factory.put(url, data)
        view = AdDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(
            response.status_code,
            200,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )
        self.assertEqual(Ad.objects.get().active, data["active"])

    def test_remove(self):
        ad = Ad.objects.create()
        current_objects_count = Ad.objects.count()
        url = reverse("ad_detail", kwargs={"pk": 1})
        request = self.factory.delete(url)
        view = AdDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(
            response.status_code,
            204,
            f"Expected Response Code 204, received {response.status_code} instead.",
        )
        self.assertEqual(Ad.objects.count(), current_objects_count - 1)



class PetTests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.data = {
            "name": "karolinka",
            "species": "pies",
            "subSpecies": "labrador",
            "age": 2,
            "gender": "suka",
            "color": "czarny",
        }

    def test_create(self):
        url = reverse("pet_create", kwargs={"pk": 1})
        response = self.client.post(url, self.data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Pet.objects.count(), 1)
        self.assertEqual(Pet.objects.get().name, self.data["name"])

    def test_detail(self):
        Pet.objects.create()
        url = reverse("pet_detail", kwargs={"pk": 1})
        request = self.factory.get(url)
        view = PetDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(
            response.status_code,
            200,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )
