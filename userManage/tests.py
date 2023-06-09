from django.contrib.auth.models import Permission
from django.urls import reverse, reverse_lazy
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from userAuth.models import User
from .views import UserList, UserDetail
from permissionHandler.models import UserPermission


class UserTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.data = {
            "username": "ewa",
            "first_name": "Ewa",
            "last_name": "Porada",
            "email": "ewa@tdd.com",
            "password": "nielubiebacy",
            "is_staff": 1,
            "is_active": 1,
        }
        self.user = User.objects.create_user(
            username="ewa", password="ewa12345", email="ewa@tdd.com"
        )
        self.user2 = User.objects.create_user(username="gocha", password="gocha12345")

        permission_view = Permission.objects.get(codename="view_user")
        permission_change = Permission.objects.get(codename="change_user")
        permission_delete = Permission.objects.get(codename="delete_user")
        permission_view_all = Permission.objects.get(codename="view_all_users")
        UserPermission.objects.create(user=self.user, permission=permission_view)
        UserPermission.objects.create(user=self.user, permission=permission_change)
        UserPermission.objects.create(user=self.user, permission=permission_delete)
        UserPermission.objects.create(user=self.user, permission=permission_view_all)

    def test_list_with_auth(self):
        self.client.force_authenticate(user=self.user)
        url = reverse("user_list")
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_list_without_auth(self):
        url = reverse("user_list")
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            f"Expected Response Code 401, received {response.status_code} instead.",
        )

    def test_list_without_permission(self):
        self.client.force_authenticate(user=self.user2)
        url = reverse("user_list")
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            f"Expected Response Code 403, received {response.status_code} instead.",
        )

    def test_detail_with_auth(self):
        self.client.force_authenticate(user=self.user)
        url = reverse("user_detail", kwargs={"pk": 1})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_detail_without_auth(self):
        url = reverse("user_detail", kwargs={"pk": 1})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            f"Expected Response Code 401, received {response.status_code} instead.",
        )

    def test_detail_without_permission(self):
        self.client.force_authenticate(user=self.user2)
        url = reverse("user_detail", kwargs={"pk": 1})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            f"Expected Response Code 403, received {response.status_code} instead.",
        )

    def test_edit_with_auth(self):
        self.client.force_authenticate(user=self.user)
        url = reverse("user_detail", kwargs={"pk": 1})
        data = self.data
        data["email"] = "xyz@gmail.com"
        response = self.client.put(url, data)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )
        self.assertEqual(User.objects.get(id=1).email, self.data["email"])

    def test_edit_without_auth(self):
        url = reverse("user_detail", kwargs={"pk": 1})
        data = self.data
        data["email"] = "xyz@gmail.com"
        response = self.client.put(url, data)
        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            f"Expected Response Code 401, received {response.status_code} instead.",
        )
        self.assertNotEqual(User.objects.get(id=1).email, self.data["email"])

    def test_edit_without_permission(self):
        self.client.force_authenticate(user=self.user2)
        url = reverse("user_detail", kwargs={"pk": 1})
        data = self.data
        data["email"] = "xyz@gmail.com"
        response = self.client.put(url, data)
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            f"Expected Response Code 403, received {response.status_code} instead.",
        )
        self.assertNotEqual(User.objects.get(id=1).email, self.data["email"])

    def test_remove_with_auth(self):
        self.client.force_authenticate(user=self.user)
        current_objects_count = User.objects.count()
        url = reverse("user_detail", kwargs={"pk": 1})
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            204,
            f"Expected Response Code 204, received {response.status_code} instead.",
        )
        self.assertEqual(User.objects.count(), current_objects_count - 1)
        self.assertNotIn(self.user, User.objects.all())

    def test_remove_without_auth(self):
        current_objects_count = User.objects.count()
        url = reverse("user_detail", kwargs={"pk": 1})
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
            f"Expected Response Code 401, received {response.status_code} instead.",
        )
        self.assertEqual(User.objects.count(), current_objects_count)
        self.assertIn(self.user, User.objects.all())

    def test_remove_without_permission(self):
        self.client.force_authenticate(user=self.user2)
        current_objects_count = User.objects.count()
        url = reverse("user_detail", kwargs={"pk": 1})
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            f"Expected Response Code 403, received {response.status_code} instead.",
        )
        self.assertEqual(User.objects.count(), current_objects_count)
        self.assertIn(self.user, User.objects.all())
