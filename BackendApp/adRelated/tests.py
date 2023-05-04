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
            'pet': pet,
            'active': False,
            'shelter': shelter,
            'photo_album': album
        }
    def test_list(self):
        url = reverse('ad_list')
        request = self.factory.get(url)
        view = AdList.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 200, f'Expected Response Code 200, received {response.status_code} instead.')
    def test_create(self):
        url = reverse('ad_create')
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Ad.objects.count(), 1)
        self.assertEqual(Ad.objects.get().name, self.data['name'])
    def test_detail(self):
        Ad.objects.create()
        url = reverse('ad_detail', kwargs={'pk': 1})
        request = self.factory.get(url)
        view = AdDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 200, f'Expected Response Code 200, received {response.status_code} instead.')
    def test_edit(self):
        Ad.objects.create(active=True)
        url = reverse('ad_edit', kwargs={'pk': 1})
        data = self.data
        data['active'] = False
        request = self.factory.put(url, data)
        view = AdDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 200, f'Expected Response Code 200, received {response.status_code} instead.')
        self.assertEqual(Ad.objects.get().active, data['active'])

    def test_remove(self):
        album = Ad.objects.create()
        current_objects_count = Ad.objects.count()
        url = reverse('ad_remove', kwargs={'pk': 1})
        request = self.factory.delete(url)
        view = AdDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 204, f'Expected Response Code 204, received {response.status_code} instead.')
        self.assertEqual(Ad.objects.count(), current_objects_count - 1)
        self.assertIn(album, Ad.objects.get())

    def test_get_album(self):
        Ad.objects.create()
        url = reverse('ad_photo_album', kwargs={'pk': 1})
        request = self.factory.get(url)
        view = AdDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 200, f'Expected Response Code 200, received {response.status_code} instead.')

    def test_get_share_link(self):
        Ad.objects.create()
        url = reverse('share_link', kwargs={'pk': 1})
        request = self.factory.get(url)
        view = AdDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 200, f'Expected Response Code 200, received {response.status_code} instead.')


class PetTests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.data = {
            'name': 'karolinka',
            'species': 'pies',
            'subSpecies': 'labrador',
            'age': 2,
            'gender': 'suka',
            'color': 'czarny'
        }
    def test_create(self):
        url = reverse('ad_create')
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Pet.objects.count(), 1)
        self.assertEqual(Pet.objects.get().name, self.data['name'])
    def test_detail(self):
        Pet.objects.create()
        url = reverse('pet_detail', kwargs={'pk': 1})
        request = self.factory.get(url)
        view = PetDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 200, f'Expected Response Code 200, received {response.status_code} instead.')

