from django.urls import reverse, reverse_lazy
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory
from userAuth.models import User
from .views import UserList, UserDetail


class UserTests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory(enforce_csrf_checks=True)
        self.data = {
            'username': 'ewa',
            'first_name': 'Ewa',
            'last_name': 'Porada',
            'email': 'ewa@tdd.com',
            'password': 'nielubiebacy',
            'is_staff': 1,
            'is_active': 1
        }

    def test_list(self):
        url = reverse('user_list')
        request = self.factory.get(url)
        view = UserList.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 200, f'Expected Response Code 200, received {response.status_code} instead.')

    def test_create(self):
        url = reverse('user_add')
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().email, self.data['email'])

    def test_detail(self):
        User.objects.create()
        url = reverse('user_detail', kwargs={'pk': 1})
        request = self.factory.get(url)
        view = UserDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 200, f'Expected Response Code 200, received {response.status_code} instead.')

    def test_edit(self):
        User.objects.create()
        url = reverse('user_edit', kwargs={'pk': 1})
        data = self.data
        data['email'] = 'xyz@gmail.com'
        request = self.factory.put(url, data)
        view = UserDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 200, f'Expected Response Code 200, received {response.status_code} instead.')
        self.assertEqual(User.objects.get().email, self.data['email'])

    def test_remove(self):
        user = User.objects.create()
        current_objects_count = User.objects.count()
        url = reverse('user_remove', kwargs={'pk': 1})
        request = self.factory.delete(url)
        view = UserDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(response.status_code, 204, f'Expected Response Code 204, received {response.status_code} instead.')
        self.assertEqual(User.objects.count(), current_objects_count - 1)
        self.assertNotIn(user, User.objects.all())
