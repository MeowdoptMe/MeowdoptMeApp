from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory
from .models import PhotoAlbum, Photo
from .views import PhotoAlbumList, PhotoAlbumCreate, PhotoAlbumDetail, PhotoList, PhotoCreate, PhotoDetail

class PhotoAlbumTests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
    def test_list(self):
        url = reverse('photo_album_list')
        request = self.factory.get(url)
        view = PhotoAlbumList.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 200, f'Expected Response Code 200, received {response.status_code} instead.')
    def test_create(self):
        data = {
            'name': 'test-album'
        }
        url = reverse('photo_album_create')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(PhotoAlbum.objects.count(), 1)
        self.assertEqual(PhotoAlbum.objects.get().name, data['name'])
    def test_detail(self):
        PhotoAlbum.objects.create(name="test_album")
        url = reverse('photo_album_detail', kwargs={'pk': 1})
        request = self.factory.get(url)
        view = PhotoAlbumDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 200, f'Expected Response Code 200, received {response.status_code} instead.')

    def test_edit(self):
        PhotoAlbum.objects.create(name="test_album")
        url = reverse('photo_album_edit', kwargs={'pk': 1})
        data = {
            'name': 'first_album'
        }
        request = self.factory.put(url, data)
        view = PhotoAlbumDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 200, f'Expected Response Code 200, received {response.status_code} instead.')
        self.assertEqual(PhotoAlbum.objects.get().name, data['name'])


    def test_remove(self):
        album = PhotoAlbum.objects.create(name="test_album")
        current_objects_count = PhotoAlbum.objects.count()
        url = reverse('photo_album_remove', kwargs={'pk': 1})
        request = self.factory.delete(url)
        view = PhotoAlbumDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 204, f'Expected Response Code 204, received {response.status_code} instead.')
        self.assertEqual(PhotoAlbum.objects.count(), current_objects_count - 1)
        self.assertIn(album, PhotoAlbum.objects.get())

class PhotoTests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
    def test_list(self):
        url = reverse('photo_list')
        request = self.factory.get(url)
        view = PhotoList.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 200, f'Expected Response Code 200, received {response.status_code} instead.')
    def test_create(self):
        data = {
            'name': 'test_photo'
        }
        url = reverse('photo_create')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Photo.objects.count(), 1)
        self.assertEqual(Photo.objects.get().name, data['name'])
    def test_detail(self):
        Photo.objects.create(name="test_photo")
        url = reverse('photo_detail', kwargs={'pk': 1})
        request = self.factory.get(url)
        view = PhotoDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 200, f'Expected Response Code 200, received {response.status_code} instead.')

    def test_edit(self):
        Photo.objects.create(name="test_photo")
        url = reverse('photo_album_edit', kwargs={'pk': 1})
        data = {
            'name': 'photo',
        }
        request = self.factory.put(url, data)
        view = PhotoDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 200, f'Expected Response Code 200, received {response.status_code} instead.')
        self.assertEqual(Photo.objects.get().name, data['name'])


    def test_remove(self):
        album = Photo.objects.create(name="test_photo")
        current_objects_count = Photo.objects.count()
        url = reverse('photo_remove', kwargs={'pk': 1})
        request = self.factory.delete(url)
        view = PhotoDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 204, f'Expected Response Code 204, received {response.status_code} instead.')
        self.assertEqual(Photo.objects.count(), current_objects_count - 1)
        self.assertIn(album, Photo.objects.get())