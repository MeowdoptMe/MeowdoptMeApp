from django.contrib.auth.models import Permission
from django.urls import reverse_lazy
from rest_framework import status
from rest_framework.test import (
    APITestCase,
    APIClient,
)

from .models import UserPermission, PermissionRequest
from shelterRelated.models import Shelter

from .permissions import PermissionRequestAccess
from userAuth.models import User


class UserPermissionTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.data = {"user": 1, "shelter": 1, "permission": 27}
        self.user = User.objects.create_user(username="ewa", password="ewa12345")
        self.user2 = User.objects.create_user(username="gocha", password="gocha12345")
        self.shelter = Shelter.objects.create()
        permission_create = Permission.objects.get(codename="add_userpermission")
        permission_change = Permission.objects.get(codename="change_userpermission")
        permission_delete = Permission.objects.get(codename="delete_userpermission")
        permission_view = Permission.objects.get(codename="view_userpermission")
        UserPermission.objects.create(
            user=self.user, shelter=self.shelter, permission=permission_create
        )
        UserPermission.objects.create(
            user=self.user, shelter=self.shelter, permission=permission_change
        )
        UserPermission.objects.create(
            user=self.user, shelter=self.shelter, permission=permission_delete
        )
        UserPermission.objects.create(
            user=self.user, shelter=self.shelter, permission=permission_view
        )

    def test_list_with_auth(self):
        self.client.force_authenticate(user=self.user)
        url = reverse_lazy("shelter_permission_list", kwargs={"shelter_id": 1})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_list_with_no_auth(self):
        self.client.force_authenticate(user=self.user2)
        url = reverse_lazy("shelter_permission_list", kwargs={"shelter_id": 1})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            f"Expected Response Code 403, received {response.status_code} instead.",
        )

    def test_create_with_auth(self):
        actual_permission_count = UserPermission.objects.count()
        self.client.force_authenticate(user=self.user)
        url = reverse_lazy("shelter_permission_create", kwargs={"shelter_id": 1})
        response = self.client.post(url, self.data, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            f"Expected Response Code 201, received {response.status_code} instead.",
        )
        self.assertEqual(UserPermission.objects.count(), actual_permission_count + 1)
        self.assertEqual(
            UserPermission.objects.get(id=actual_permission_count + 1).user, self.user
        )

    def test_create_with_no_auth(self):
        actual_permission_count = UserPermission.objects.count()
        self.client.force_authenticate(user=self.user2)
        url = reverse_lazy("shelter_permission_create", kwargs={"shelter_id": 1})
        response = self.client.post(url, self.data, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            f"Expected Response Code 403, received {response.status_code} instead.",
        )
        self.assertEqual(UserPermission.objects.count(), actual_permission_count)
        self.assertEqual(
            UserPermission.objects.get(id=actual_permission_count).user, self.user
        )

    def test_detail_with_auth(self):
        current_objects_count = UserPermission.objects.count()
        self.client.force_authenticate(user=self.user)
        url = reverse_lazy(
            "shelter_permission_detail",
            kwargs={"shelter_id": 1, "pk": current_objects_count},
        )
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_detail_with_no_auth(self):
        current_objects_count = UserPermission.objects.count()
        self.client.force_authenticate(user=self.user2)
        url = reverse_lazy(
            "shelter_permission_detail",
            kwargs={"shelter_id": 1, "pk": current_objects_count},
        )
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            f"Expected Response Code 403, received {response.status_code} instead.",
        )

    def test_edit_with_auth(self):
        current_objects_count = UserPermission.objects.count()
        self.client.force_authenticate(user=self.user)
        url = reverse_lazy(
            "shelter_permission_detail",
            kwargs={"shelter_id": 1, "pk": current_objects_count},
        )
        data = self.data
        data["permission"] = 2
        response = self.client.put(url, data)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )
        self.assertEqual(
            UserPermission.objects.get(id=current_objects_count).permission.id,
            data["permission"],
        )

    def test_edit_with_no_auth(self):
        current_objects_count = UserPermission.objects.count()
        self.client.force_authenticate(user=self.user2)
        url = reverse_lazy(
            "shelter_permission_detail",
            kwargs={"shelter_id": 1, "pk": current_objects_count},
        )
        data = self.data
        data["permission"] = 2
        response = self.client.put(url, data)
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            f"Expected Response Code 403, received {response.status_code} instead.",
        )
        self.assertNotEquals(
            UserPermission.objects.get(id=1).permission.id, data["permission"]
        )

    def test_remove_with_auth(self):
        current_objects_count = UserPermission.objects.count()
        self.client.force_authenticate(user=self.user)
        url = reverse_lazy(
            "shelter_permission_detail",
            kwargs={"shelter_id": 1, "pk": current_objects_count},
        )
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            f"Expected Response Code 204, received {response.status_code} instead.",
        )
        self.assertEqual(UserPermission.objects.count(), current_objects_count - 1)

    def test_remove_with_no_auth(self):
        current_objects_count = UserPermission.objects.count()
        self.client.force_authenticate(user=self.user2)
        url = reverse_lazy(
            "shelter_permission_detail", kwargs={"shelter_id": 1, "pk": 31}
        )
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            f"Expected Response Code 403, received {response.status_code} instead.",
        )
        self.assertEqual(UserPermission.objects.count(), current_objects_count)


class PermissionRequestTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.data = {"group": "ShelterWorker", "shelter_id": 1}
        self.user = User.objects.create_user(username="ewa", password="ewa12345")
        self.user2 = User.objects.create_user(username="gocha", password="gocha12345")
        self.shelter = Shelter.objects.create()
        permission_delete = Permission.objects.get(codename="delete_permissionrequest")
        permission_view = Permission.objects.get(codename="view_permissionrequest")
        permission_change = Permission.objects.get(codename="change_permissionrequest")
        UserPermission.objects.create(
            user=self.user, shelter=self.shelter, permission=permission_delete
        )
        UserPermission.objects.create(
            user=self.user, shelter=self.shelter, permission=permission_view
        )
        UserPermission.objects.create(
            user=self.user, shelter=self.shelter, permission=permission_change
        )
        PermissionRequest.objects.create(
            user=self.user, shelter=self.shelter, group="Manager"
        )

    def test_list_with_auth(self):
        self.client.force_authenticate(user=self.user)
        url = reverse_lazy("permission_request_list")
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_list_with_no_auth(self):
        self.client.force_authenticate(user=self.user2)
        url = reverse_lazy("permission_request_list")
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            f"Expected Response Code 403, received {response.status_code} instead.",
        )

    def test_list_by_shelter_with_auth(self):
        self.client.force_authenticate(user=self.user)
        url = reverse_lazy("permission_request_list_shelter", kwargs={"shelter_id": 1})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_list_by_shelter_with_no_auth(self):
        self.client.force_authenticate(user=self.user2)
        url = reverse_lazy("permission_request_list_shelter", kwargs={"shelter_id": 1})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            f"Expected Response Code 403, received {response.status_code} instead.",
        )

    def test_list_by_user_with_auth(self):
        self.client.force_authenticate(user=self.user)
        url = reverse_lazy("permission_request_list_user", kwargs={"user_id": 1})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_list_by_user_with_no_auth(self):
        self.client.force_authenticate(user=self.user2)
        url = reverse_lazy("permission_request_list_user", kwargs={"user_id": 1})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            f"Expected Response Code 403, received {response.status_code} instead.",
        )

    def test_create_with_auth(self):
        PermissionRequest.objects.count()
        self.client.force_authenticate(user=self.user)
        url = reverse_lazy("permission_request_create")
        response = self.client.post(url, self.data, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_create_with_no_auth(self):
        PermissionRequest.objects.count()
        self.client.force_authenticate(user=self.user2)
        url = reverse_lazy("permission_request_create")
        response = self.client.post(url, self.data, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            f"Expected Response Code 201, received {response.status_code} instead.",
        )

    def test_detail_with_auth(self):
        self.client.force_authenticate(user=self.user)
        url = reverse_lazy("permission_request_detail", kwargs={"pk": 1})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )

    def test_detail_with_no_auth(self):
        self.client.force_authenticate(user=self.user2)
        url = reverse_lazy("permission_request_detail", kwargs={"pk": 1})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            f"Expected Response Code 403, received {response.status_code} instead.",
        )

    def test_resolve_with_auth(self):
        self.client.force_authenticate(user=self.user)
        url = reverse_lazy("permission_request_resolve", kwargs={"pk": 1})
        response = self.client.post(url, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
            f"Expected Response Code 204, received {response.status_code} instead.",
        )
        for user_permission in PermissionRequestAccess.manager_permissions:
            permission = Permission.objects.get(codename=user_permission)
            if permission:
                self.assertIsNotNone(
                    UserPermission.objects.filter(permission=permission)
                )

    def test_resolve_with_no_auth(self):
        self.client.force_authenticate(user=self.user2)
        url = reverse_lazy("permission_request_resolve", kwargs={"pk": 1})
        response = self.client.post(url, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            f"Expected Response Code 403, received {response.status_code} instead.",
        )

    def test_reject_with_auth(self):
        current_objects_count = PermissionRequest.objects.count()
        self.client.force_authenticate(user=self.user)
        url = reverse_lazy("permission_request_reject", kwargs={"pk": 1})
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
            f"Expected Response Code 204, received {response.status_code} instead.",
        )
        self.assertEqual(PermissionRequest.objects.count(), current_objects_count - 1)

    def test_reject_with_no_auth(self):
        current_objects_count = PermissionRequest.objects.count()
        self.client.force_authenticate(user=self.user2)
        url = reverse_lazy("permission_request_reject", kwargs={"pk": 1})
        response = self.client.delete(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
            f"Expected Response Code 403, received {response.status_code} instead.",
        )
        self.assertEqual(PermissionRequest.objects.count(), current_objects_count)
