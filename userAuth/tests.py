from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.urls import reverse
from django.utils.encoding import smart_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework import status
from rest_framework.test import (
    APITestCase,
    APIClient,
)
from .models import User


class UserAuthTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="ewa", password="ewa12345", email="malgdras@gmail.com"
        )

    def test_register_with_valid_data(self):
        url = reverse("register")
        data = {
            "email": "tdd@gmail.com",
            "username": "tdd",
            "password": "krowa12345",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            f"Expected Response Code 201, received {response.status_code} instead.",
        )

    def test_register_with_existing_user(self):
        url = reverse("register")
        data = {
            "email": "malgdras@gmail.com",
            "username": "ewa",
            "password": "ewa12345",
        }
        response = self.client.post(url, data, format="json")
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
        response = self.client.post(url, data, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            f"Expected Response Code 201, received {response.status_code} instead.",
        )
        self.assertEqual(User.objects.get(id=2).first_name, "")

    def test_login_with_valid_data(self):
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
        self.client.force_authenticate(user=self.user)
        url = reverse("change_password")
        data = {"current_password": "ewa12345", "new_password": "krowa12345"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_change_email(self):
        self.client.force_authenticate(user=self.user)
        url = reverse("change_email")
        data = {"email": "ewaX@gochad.pl"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )
        self.assertEqual(User.objects.get().email, data["email"])

    def test_logout(self):
        user = User.objects.create_user(username="ewusia", password="ewa12345")
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

    def test_password_reset_existing_email(self):
        url = reverse("request_password_reset")
        data = {"email": "malgdras@gmail.com"}
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

    def test_password_reset_not_existing_email(self):
        url = reverse("request_password_reset")
        data = {"email": "tdd@gmail.com"}
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

    def test_password_reset_confirm_valid_data(self):
        uidb64 = urlsafe_base64_encode(smart_bytes(self.user.id))
        token = PasswordResetTokenGenerator().make_token(self.user)
        url = reverse(
            "password_reset_confirm", kwargs={"token": token, "uidb64": uidb64}
        )
        response = self.client.get(
            url,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_password_reset_confirm_invalid_data(self):
        uidb64 = urlsafe_base64_encode(smart_bytes(self.user.id))
        token = PasswordResetTokenGenerator().make_token(self.user) + "s"

        url = reverse(
            "password_reset_confirm", kwargs={"token": token, "uidb64": uidb64}
        )
        response = self.client.get(
            url,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            f"Expected Response Code 401, received {response.status_code} instead.",
        )

    def test_password_reset_complete_valid_data(self):
        uidb64 = urlsafe_base64_encode(smart_bytes(self.user.id))
        token = PasswordResetTokenGenerator().make_token(self.user)
        data = {"password": "new-pwd1234", "token": token, "uidb64": uidb64}
        url = reverse("password_reset_complete")
        response = self.client.patch(
            url,
            data,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_password_reset_complete_invalid_data(self):
        uidb64 = urlsafe_base64_encode(smart_bytes(self.user.id))
        token = PasswordResetTokenGenerator().make_token(self.user) + "s"
        data = {"password": "new-pwd1234", "token": token, "uidb64": uidb64}
        url = reverse("password_reset_complete")
        response = self.client.patch(
            url,
            data,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            f"Expected Response Code 401, received {response.status_code} instead.",
        )

    def login(self, user_data):
        url = reverse("login")
        return self.client.post(url, user_data, format="json")
