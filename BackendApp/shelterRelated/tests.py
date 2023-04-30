from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import APITestCase, APIRequestFactory
from .models import Shelter, ContactInfo
from .views import ShelterList, ContactInfoList

class ContactInfoTests(APITestCase):
    @staticmethod
    def setup_shelter():
        shelter = Shelter()
        return shelter.objects.create(
            name='test-shelter',
            photo_album=1,
            contact_info=1,
        )
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = ContactInfoList.as_view()
        self.shelter = self.setup_shelter()
        self.uri = f"{reverse('shelters')}/{self.shelter.id}"
    def test_detail(self):
        request = self.factory.get(f'{self.uri}/contact_info')
        response = self.view(request)
        self.assertEqual(response.status_code, 200, f'Expected Response Code 200, received {response.status_code} instead.')
    def test_create(self):
        data = {
            'email': 'tdd@gmail.com',
            'phone': '123456789',
            'user': 1,
            'location': 'Polaniec, ul. Krakowska 5',
            'x_cord': 52.111,
            'y_cord': 26.752,
        }
        response = self.client.post(f'{self.uri}/edit_contact_info', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactInfo.objects.count(), 1)
        self.assertEqual(ContactInfo.objects.get().phone, '12345678')

class ShelterTests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = ShelterList.as_view({'get': 'list'})
    def test_list(self):
        request = self.factory.get(reverse('shelters'))
        response = self.view(request)
        self.assertEqual(response.status_code, 200, f'Expected Response Code 200, received {response.status_code} instead.')
    def test_detail(self):
        request = self.factory.get(reverse('shelter_detail'))
        response = self.view(request)
        self.assertEqual(response.status_code, 200, f'Expected Response Code 200, received {response.status_code} instead.')
    def test_create(self):
        data = {'name': 'test_shelter', 'photo_alum': 1, 'contact_info': 1}
        response = self.client.post(reverse('shelter_add'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Shelter.objects.count(), 1)
        self.assertEqual(Shelter.objects.get().name, 'test_shelter')



