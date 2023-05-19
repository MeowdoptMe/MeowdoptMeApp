from django.urls import reverse
from rest_framework import status
from rest_framework.test import (
    APITestCase,
    APIRequestFactory,
    APIClient,
)
from .models import User
from .views import (
    RegisterView,
    LoginView,
)


class UserAuthTests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory(enforce_csrf_checks=True)
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="ewa", password="ewa12345", email="malaga.drag@gmail.com"
        )

    def test_register_with_valid_data(self):
        url = reverse("register")
        data = {
            "email": "tdd@gmail.com",
            "username": "tdd",
            "password": "krowa12345",
        }
        request = self.factory.post(url, data, format="json")
        view = RegisterView.as_view()
        response = view(request)
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            f"Expected Response Code 201, received {response.status_code} instead.",
        )

    def test_register_with_existing_user(self):
        User.objects.create_user(username="ewa", password="ewa12345")
        url = reverse("register")
        data = {
            "email": "tdd@gmail.com",
            "username": "ewa",
            "password": "ewa12345",
        }
        request = self.factory.post(url, data, format="json")
        view = RegisterView.as_view()
        response = view(request)
        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            f"Expected Response Code 400, received {response.status_code} instead.",
        )

    def test_register_with_additional_data(self):
        url = reverse("register")
        data = {
            "email": "tdd@gmail.com",
            "username": "ala",
            "password": "12345ala",
            "first_name": "Ala",
        }
        request = self.factory.post(url, data, format="json")
        view = RegisterView.as_view()
        response = view(request)
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            f"Expected Response Code 201, received {response.status_code} instead.",
        )
        self.assertEqual(User.objects.get().first_name, "")

    def test_login_with_valid_data(self):
        User.objects.create_user(username="ewa", password="ewa12345")
        user_data = {
            "username": "ewa",
            "password": "ewa12345",
        }
        response = self.login(user_data)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_login_with_invalid_data(self):
        User.objects.create_user(username="ewa", password="ewa12345")
        user_data = {
            "username": "ewa",
            "password": "ewa1234",
        }
        response = self.login(user_data)
        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            f"Expected Response Code 401, received {response.status_code} instead.",
        )

    def test_login_not_existing_user(self):
        user_data = {
            "username": "ewa",
            "password": "ewa1234",
        }
        response = self.login(user_data)
        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            f"Expected Response Code 401, received {response.status_code} instead.",
        )

    def test_change_password(self):
        User.objects.create_user(username="ewa", password="ewa12345")
        self.client.force_authenticate(user=self.user)
        url = reverse("change_password")
        data = {"current_password": "ewa12345", "new_password": "krowa12345"}
        response = self.factory.post(url, data, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            f"Expected Response Code 204, received {response.status_code} instead.",
        )

    def test_change_email(self):
        self.client.force_authenticate(user=self.user)
        url = reverse("change_email")
        data = {"email": "ewaX@gochad.pl"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            f"Expected Response Code 204, received {response.status_code} instead.",
        )
        self.assertEqual(User.objects.get().email, data["email"])

    def test_logout(self):
        user = User.objects.create_user(username="ewa", password="ewa12345")
        self.client.force_authenticate(user=user)
        url = reverse("logout")
        response = self.client.post(
            path=url,
            format="json",
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_forgot_password_existing_email(self):
        url = reverse("forgot_password")
        data = {"email": "malaga.drag@gmail.com"}
        response = self.client.post(
            url,
            data,
            format="json",
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_forgot_password_not_existing_email(self):
        url = reverse("forgot_password")
        data = {"email": "td@gmail.com"}
        response = self.client.post(
            url,
            data,
            format="json",
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            f"Expected Response Code 400, received {response.status_code} instead.",
        )

    def login(self, user_data):
        url = reverse("login")
        request = self.factory.post(url, user_data, format="json")
        view = LoginView.as_view()
        return view(request)
