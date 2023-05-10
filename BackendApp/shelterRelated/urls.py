from django.urls import path

from permissionHandler.views import (
    UserPermissionList,
    UserPermissionDetail,
    UserPermissionCreate,
    PermissionRequestList,
    PermissionRequestDetail,
    PermissionRequestCreate,
    PermissionRequestResolve,
)
from .views import (
    ShelterList,
    ShelterCreate,
    ShelterDetail,
)

urlpatterns = [
    path("", ShelterList.as_view(), name="shelter_list"),
    path("<int:pk>/", ShelterDetail.as_view(), name="shelter_detail"),
    path("add/", ShelterCreate.as_view(), name="shelter_create"),
    path(
        "<int:shelter_id>/permissions/",
        UserPermissionList.as_view(),
        name="shelter_permission_list",
    ),
    path(
        "<int:shelter_id>/permissions/add/",
        UserPermissionCreate.as_view(),
        name="shelter_permission_create",
    ),
    path(
        "<int:shelter_id>/permissions/<int:pk>/",
        UserPermissionDetail.as_view(),
        name="shelter_permission_detail",
    ),
    path(
        "<int:shelter_id>/requests/",
        PermissionRequestList.as_view(),
        name="permission_request_list",
    ),
    path(
        "<int:shelter_id>/requests/<int:pk>/",
        PermissionRequestDetail.as_view(),
        name="permission_request_detail",
    ),
    path(
        "<int:shelter_id>/make-request/",
        PermissionRequestCreate.as_view(),
        name="permission_request_create",
    ),
    path(
        "<int:shelter_id>/requests/<int:pk>/resolve-request/",
        PermissionRequestResolve.as_view(),
        name="permission_request_resolve",
    ),
]
