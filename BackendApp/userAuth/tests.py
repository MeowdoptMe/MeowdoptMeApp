from django.urls import reverse
from rest_framework.test import (
    APITestCase,
    APIRequestFactory,
    force_authenticate,
    APIClient,
)
from .models import User
from .views import (
    RegisterView,
    LoginView,
    ChangePasswordView,
    LogoutView,
    ChangeEmailView,
)


class UserAuthTests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory(enforce_csrf_checks=True)
        self.client = APIClient()

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
            201,
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
            400,
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
            201,
            f"Expected Response Code 400, received {response.status_code} instead.",
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
            200,
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
            401,
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
            401,
            f"Expected Response Code 401, received {response.status_code} instead.",
        )

    def test_change_password(self):
        user = User.objects.create_user(username="ewa", password="ewa12345")
        user_data = {
            "username": "ewa",
            "password": "ewa12345",
        }
        response = self.login(user_data)
        token = response.data["access"]
        url = reverse("change_password")
        data = {"current_password": "ewa12345", "new_password": "krowa12345"}
        request = self.factory.post(url, data, format="json")
        force_authenticate(request, user=user, token=token)
        view = ChangePasswordView.as_view()
        response = view(request)
        self.assertEqual(
            response.status_code,
            204,
            f"Expected Response Code 204, received {response.status_code} instead.",
        )

    def test_change_email(self):
        user = User.objects.create_user(
            username="ewa", password="ewa12345", email="ewa@gmail.com"
        )
        user_data = {
            "username": "ewa",
            "password": "ewa12345",
        }
        response = self.login(user_data)
        token = response.data["access"]
        url = reverse("change_email")
        data = {"email": "ewaX@gochad.pl"}
        request = self.factory.post(url, data, format="json")
        force_authenticate(request, user=user, token=token)
        view = ChangeEmailView.as_view()
        response = view(request)
        self.assertEqual(
            response.status_code,
            204,
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
            200,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def login(self, user_data):
        url = reverse("login")
        request = self.factory.post(url, user_data, format="json")
        view = LoginView.as_view()
        return view(request)
