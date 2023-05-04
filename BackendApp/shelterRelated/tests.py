from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory

from photoAlbum.models import PhotoAlbum
from userAuth.models import User
from .models import Shelter, ContactInfo
from .views import ShelterList, ShelterDetail, ContactInfoDetail


class ContactInfoTests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.data = {
            'email': 'tdd@gmail.com',
            'phone': '123456789',
            'user': 1,
            'location': 'Polaniec, ul. Krakowska 5',
            'x_cord': 52.111,
            'y_cord': 26.752,
        }

    def test_create(self):
        url = reverse('contact_info_create')
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactInfo.objects.count(), 1)
        self.assertEqual(ContactInfo.objects.get().phone, self.data['phone'])

    def test_detail(self):
        ContactInfo.objects.create(name="test_contact_info")
        url = reverse('contact_info_detail', kwargs={'pk': 1})
        request = self.factory.get(url)
        view = ContactInfoDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 200,
                         f'Expected Response Code 200, received {response.status_code} instead.')

    def test_edit(self):
        ContactInfo.objects.create(name="test_contact_info")
        url = reverse('contact_info_edit', kwargs={'pk': 1})
        data = self.data
        data['email'] = 'xyz@gmail.com'
        request = self.factory.put(url, data)
        view = ContactInfoDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 200,
                         f'Expected Response Code 200, received {response.status_code} instead.')
        self.assertEqual(ContactInfo.objects.get().name, self.data['email'])

    def test_remove(self):
        contact_info = ContactInfo.objects.create(name="test_contact_info")
        current_objects_count = ContactInfo.objects.count()
        url = reverse('contact_info_remove', kwargs={'pk': 1})
        request = self.factory.delete(url)
        view = ContactInfoDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 204,
                         f'Expected Response Code 204, received {response.status_code} instead.')
        self.assertEqual(ContactInfo.objects.count(), current_objects_count - 1)
        self.assertIn(contact_info, ContactInfo.objects.get())


class ShelterTests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        user = User.objects.create()
        info = ContactInfo.objects.create()
        album = PhotoAlbum.objects.create()
        self.data = {
            'name': 'test_shelter',
            'contact_info': info,
            'photo_album': album,
        }

    def test_list(self):
        url = reverse('shelter_list')
        request = self.factory.get(url)
        view = ShelterList.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 200,
                         f'Expected Response Code 200, received {response.status_code} instead.')

    def test_create(self):
        url = reverse('shelter_create')
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Shelter.objects.count(), 1)
        self.assertEqual(Shelter.objects.get().name, self.data['name'])

    def test_detail(self):
        Shelter.objects.create(name="test_shelter")
        url = reverse('shelter_detail', kwargs={'pk': 1})
        request = self.factory.get(url)
        view = ShelterDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 200,
                         f'Expected Response Code 200, received {response.status_code} instead.')

    def test_edit(self):
        Shelter.objects.create(name="test_photo")
        url = reverse('shelter_edit', kwargs={'pk': 1})
        data = self.data
        data['name'] = 'shelter123'
        request = self.factory.put(url, data)
        view = ShelterDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 200,
                         f'Expected Response Code 200, received {response.status_code} instead.')
        self.assertEqual(Shelter.objects.get().name, data['name'])

    def test_remove(self):
        album = Shelter.objects.create(name="test_shelter")
        current_objects_count = Shelter.objects.count()
        url = reverse('shelter_remove', kwargs={'pk': 1})
        request = self.factory.delete(url)
        view = ShelterDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 204,
                         f'Expected Response Code 204, received {response.status_code} instead.')
        self.assertEqual(Shelter.objects.count(), current_objects_count - 1)
        self.assertIn(album, Shelter.objects.get())
