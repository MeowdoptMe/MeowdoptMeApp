from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from .models import PhotoAlbum, Photo
from .utils import create_png_file


class PhotoAlbumTests(APITestCase):
    def setUp(self):
        self.client = APIClient()

    def test_list(self):
        url = reverse("photo_album_list")
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_create(self):
        data = {"name": "test-album"}
        url = reverse("photo_album_create")
        response = self.client.post(url, data, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            f"Expected Response Code 201, received {response.status_code} instead.",
        )
        self.assertEqual(PhotoAlbum.objects.count(), 1)
        self.assertEqual(PhotoAlbum.objects.get().name, data["name"])

    def test_detail(self):
        PhotoAlbum.objects.create(name="test_album")
        url = reverse("photo_album_detail", kwargs={"pk": 1})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_edit(self):
        PhotoAlbum.objects.create(name="test_album")
        url = reverse("photo_album_detail", kwargs={"pk": 1})
        data = {"name": "first_album"}
        response = self.client.put(url, data)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )
        self.assertEqual(PhotoAlbum.objects.get().name, data["name"])

    def test_remove(self):
        album = PhotoAlbum.objects.create(name="test_album")
        current_objects_count = PhotoAlbum.objects.count()
        url = reverse("photo_album_detail", kwargs={"pk": 1})
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            f"Expected Response Code 204, received {response.status_code} instead.",
        )
        self.assertEqual(PhotoAlbum.objects.count(), current_objects_count - 1)


class PhotoTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        PhotoAlbum.objects.create()
        self.file = create_png_file()
        self.data = {
            "img": self.file,
            "photo_album": 1,
        }

    def tearDown(self):
        self.file.close()

    def test_list(self):
        Photo.objects.create()
        url = reverse("photo_list", kwargs={"id": 1})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_create(self):
        url = reverse("photo_create", kwargs={"id": 1})
        response = self.client.post(url, self.data, format="multipart")
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            f"Expected Response Code 201, received {response.status_code} instead.",
        )
        self.assertEqual(Photo.objects.count(), 1)

    def test_detail(self):
        Photo.objects.create(
            img=self.data["img"], photo_album_id=self.data["photo_album"]
        )
        url = reverse("photo_detail", kwargs={"id": 1, "pk": 1})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_edit(self):
        Photo.objects.create(
            img=self.data["img"], photo_album_id=self.data["photo_album"]
        )
        url = reverse("photo_detail", kwargs={"id": 1, "pk": 1})
        data = {
            "img": create_png_file(),
        }
        response = self.client.put(url, data)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )
        self.assertNotEquals(Photo.objects.get().img, data["img"])

    def test_remove(self):
        Photo.objects.create(
            img=self.data["img"], photo_album_id=self.data["photo_album"]
        )
        current_objects_count = Photo.objects.count()
        url = reverse("photo_detail", kwargs={"id": 1, "pk": 1})
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            f"Expected Response Code 204, received {response.status_code} instead.",
        )
        self.assertEqual(Photo.objects.count(), current_objects_count - 1)
