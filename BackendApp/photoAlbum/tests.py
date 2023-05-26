from os.path import join, isfile
from os import listdir, remove
from django.contrib.auth.models import Permission
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from .models import PhotoAlbum, Photo
from .utils import create_png_file
from userAuth.models import User
from shelterRelated.models import Shelter
from adRelated.models import Ad, Pet
from permissionHandler.models import UserPermission

from BackendApp import settings


class PhotoAlbumTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
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
        self.data = {"name": "test-album"}
        photo_album = PhotoAlbum.objects.create(name="album1")
        Ad.objects.create(photo_album=photo_album, shelter=shelter)

    def test_list(self):
        url = reverse("photo_album_list")
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_create_with_auth(self):
        actual_album_count = PhotoAlbum.objects.count()
        self.client.force_authenticate(user=self.user)
        url = reverse("photo_album_create")
        response = self.client.post(url, self.data, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            f"Expected Response Code 201, received {response.status_code} instead.",
        )
        self.assertEqual(PhotoAlbum.objects.count(), actual_album_count + 1)
        self.assertEqual(
            PhotoAlbum.objects.get(id=actual_album_count + 1).name, self.data["name"]
        )

    def test_detail(self):
        photo_album = PhotoAlbum.objects.create(name="test_album")
        Ad.objects.create(photo_album=photo_album)
        url = reverse("photo_album_detail", kwargs={"pk": 1})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_edit_with_auth(self):
        self.client.force_authenticate(user=self.user)
        url = reverse("photo_album_detail", kwargs={"pk": 1})
        data = {"name": "first_album"}
        response = self.client.put(url, data)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )
        self.assertEqual(PhotoAlbum.objects.get(id=1).name, data["name"])

    def test_edit_with_no_auth(self):
        url = reverse("photo_album_detail", kwargs={"pk": 1})
        data = {"name": "first_album"}
        response = self.client.put(url, data)
        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            f"Expected Response Code 401, received {response.status_code} instead.",
        )
        self.assertNotEqual(PhotoAlbum.objects.get(id=1).name, data["name"])

    def test_edit_without_permissions(self):
        self.client.force_authenticate(user=self.user2)
        url = reverse("photo_album_detail", kwargs={"pk": 1})
        data = {"name": "first_album"}
        response = self.client.put(url, data)
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            f"Expected Response Code 403, received {response.status_code} instead.",
        )
        self.assertNotEqual(PhotoAlbum.objects.get(id=1).name, data["name"])

    def test_remove_with_auth(self):
        self.client.force_authenticate(user=self.user)
        current_objects_count = PhotoAlbum.objects.count()
        url = reverse("photo_album_detail", kwargs={"pk": 1})
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            f"Expected Response Code 204, received {response.status_code} instead.",
        )
        self.assertEqual(PhotoAlbum.objects.count(), current_objects_count - 1)

    def test_remove_with_no_auth(self):
        current_objects_count = PhotoAlbum.objects.count()
        url = reverse("photo_album_detail", kwargs={"pk": 1})
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            f"Expected Response Code 401, received {response.status_code} instead.",
        )
        self.assertEqual(PhotoAlbum.objects.count(), current_objects_count)

    def test_remove_without_permissions(self):
        self.client.force_authenticate(user=self.user2)
        current_objects_count = PhotoAlbum.objects.count()
        url = reverse("photo_album_detail", kwargs={"pk": 1})
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            f"Expected Response Code 403, received {response.status_code} instead.",
        )
        self.assertEqual(PhotoAlbum.objects.count(), current_objects_count)


class PhotoTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.file = create_png_file()
        self.data = {
            "img": self.file,
            "photo_album": 1,
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
        photo_album = PhotoAlbum.objects.create()
        Ad.objects.create(photo_album=photo_album, shelter=shelter)

    def tearDown(self):
        self.file.close()
        images_path = join(settings.MEDIA_ROOT, "photos")
        files = [
            i
            for i in listdir(images_path)
            if isfile(join(images_path, i)) and i.startswith("test_file")
        ]

        for file in files:
            remove(join(images_path, file))

    def test_list(self):
        Photo.objects.create()
        url = reverse("photo_list", kwargs={"id": 1})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_create_with_auth(self):
        self.client.force_authenticate(user=self.user)
        url = reverse("photo_create", kwargs={"id": 1})
        response = self.client.post(url, self.data, format="multipart")
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            f"Expected Response Code 201, received {response.status_code} instead.",
        )
        self.assertEqual(Photo.objects.count(), 1)

    def test_create_with_not_auth(self):
        url = reverse("photo_create", kwargs={"id": 1})
        response = self.client.post(url, self.data, format="multipart")
        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            f"Expected Response Code 401, received {response.status_code} instead.",
        )
        self.assertEqual(Photo.objects.count(), 0)

    def test_create_without_permissions(self):
        self.client.force_authenticate(user=self.user2)
        url = reverse("photo_create", kwargs={"id": 1})
        response = self.client.post(url, self.data, format="multipart")
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            f"Expected Response Code 403, received {response.status_code} instead.",
        )
        self.assertEqual(Photo.objects.count(), 0)

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

    def test_edit_with_auth(self):
        Photo.objects.create(
            img=self.data["img"], photo_album_id=self.data["photo_album"]
        )
        self.client.force_authenticate(user=self.user)
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

    def test_edit_with_no_auth(self):
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
            status.HTTP_401_UNAUTHORIZED,
            f"Expected Response Code 401, received {response.status_code} instead.",
        )
        self.assertNotEquals(Photo.objects.get().img, data["img"])

    def test_edit_without_permissions(self):
        Photo.objects.create(
            img=self.data["img"], photo_album_id=self.data["photo_album"]
        )
        self.client.force_authenticate(user=self.user2)
        url = reverse("photo_detail", kwargs={"id": 1, "pk": 1})
        data = {
            "img": create_png_file(),
        }
        response = self.client.put(url, data)
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            f"Expected Response Code 403, received {response.status_code} instead.",
        )
        self.assertNotEquals(Photo.objects.get().img, data["img"])

    def test_remove_with_auth(self):
        Photo.objects.create(
            img=self.data["img"], photo_album_id=self.data["photo_album"]
        )
        current_objects_count = Photo.objects.count()
        self.client.force_authenticate(user=self.user)
        url = reverse("photo_detail", kwargs={"id": current_objects_count, "pk": 1})
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            f"Expected Response Code 204, received {response.status_code} instead.",
        )
        self.assertEqual(Photo.objects.count(), current_objects_count - 1)

    def test_remove_with_no_auth(self):
        Photo.objects.create(
            img=self.data["img"], photo_album_id=self.data["photo_album"]
        )
        current_objects_count = Photo.objects.count()
        url = reverse("photo_detail", kwargs={"id": current_objects_count, "pk": 1})
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            f"Expected Response Code 401, received {response.status_code} instead.",
        )
        self.assertEqual(Photo.objects.count(), current_objects_count)

    def test_remove_without_permissions(self):
        Photo.objects.create(
            img=self.data["img"], photo_album_id=self.data["photo_album"]
        )
        current_objects_count = Photo.objects.count()
        self.client.force_authenticate(user=self.user2)
        url = reverse("photo_detail", kwargs={"id": current_objects_count, "pk": 1})
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            f"Expected Response Code 403, received {response.status_code} instead.",
        )
        self.assertEqual(Photo.objects.count(), current_objects_count)
