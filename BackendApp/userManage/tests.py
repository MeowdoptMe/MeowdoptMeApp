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
        self.user = User.objects.create_user(username="ewa", password="ewa12345")
        self.user2 = User.objects.create_user(username="gocha", password="gocha12345")

        permission_view = Permission.objects.get(codename="view_user")
        permission_change = Permission.objects.get(codename="change_user")
        permission_delete = Permission.objects.get(codename="delete_user")
        UserPermission.objects.create(user=self.user, permission=permission_view)
        UserPermission.objects.create(user=self.user, permission=permission_change)
        UserPermission.objects.create(user=self.user, permission=permission_delete)

    def test_list_with_auth(self):
        self.client.force_authenticate(user=self.user)
        url = reverse("user_list")
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            200,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_detail(self):
        User.objects.create()
        url = reverse("user_detail", kwargs={"pk": 1})
        request = self.factory.get(url)
        view = UserDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(
            response.status_code,
            200,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_edit(self):
        User.objects.create()
        url = reverse("user_detail", kwargs={"pk": 1})
        data = self.data
        data["email"] = "xyz@gmail.com"
        request = self.factory.put(url, data)
        view = UserDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(
            response.status_code,
            200,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )
        self.assertEqual(User.objects.get().email, self.data["email"])

    def test_remove(self):
        user = User.objects.create()
        current_objects_count = User.objects.count()
        url = reverse("user_detail", kwargs={"pk": 1})
        request = self.factory.delete(url)
        view = UserDetail.as_view()
        response = view(request, pk=1)
        self.assertEqual(
            response.status_code,
            204,
            f"Expected Response Code 204, received {response.status_code} instead.",
        )
        self.assertEqual(User.objects.count(), current_objects_count - 1)
        self.assertNotIn(user, User.objects.all())
