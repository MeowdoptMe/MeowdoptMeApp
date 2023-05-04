from django.urls import reverse
from rest_framework.test import APITestCase, APIRequestFactory
from .models import User
from .views import RegisterView, ReturnTokenView

class UserTests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory(enforce_csrf_checks=True)
    def test_register(self):
        url = reverse('register')
        data = {
            "email": "tdd@gmail.com",
            "username": "tdd",
            "password": "krowa12345",
            "password2": "krowa12345"
        }
        request = self.factory.post(url, data, format='json')
        view = RegisterView.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 201, f'Expected Response Code 201, received {response.status_code} instead.')

    def test_login(self):
        User.objects.create_user(username="ewa", password="ewa12345")
        user_data = {
            "username": "ewa",
            "password": "ewa12345",
        }
        url = reverse('login')
        request = self.factory.post(url, user_data, format='json')
        view = ReturnTokenView.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 200, f'Expected Response Code 200, received {response.status_code} instead.')