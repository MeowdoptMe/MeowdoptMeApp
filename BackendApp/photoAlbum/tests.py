from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory
from .models import PhotoAlbum, Photo
from .views import PhotoAlbumList, PhotoAlbumCreate, PhotoAlbumDetail

class PhotoAlbumTests(APITestCase):
    @staticmethod
    def setup_photo_album():
        album = PhotoAlbum()
        return album.objects.create(
            name='test-album',
        )

    def setUp(self):
        self.factory = APIRequestFactory()
        self.uri = reverse('photo_album_list')
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
        PhotoAlbum.objects.create(name="test-album")
        url = reverse('photo_album_detail', kwargs={'pk': 1})
        request = self.factory.get(url)
        view = PhotoAlbumDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 200, f'Expected Response Code 200, received {response.status_code} instead.')

    def test_edit(self):
        PhotoAlbum.objects.create(name="test-album")
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
        album = PhotoAlbum.objects.create(name="test-album")
        current_objects_count = PhotoAlbum.objects.count()
        url = reverse('photo_album_remove', kwargs={'pk': 1})
        request = self.factory.delete(url)
        view = PhotoAlbumDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 204, f'Expected Response Code 204, received {response.status_code} instead.')
        self.assertEqual(PhotoAlbum.objects.count(), current_objects_count - 1)
        self.assertIn(album, PhotoAlbum.objects.get())
