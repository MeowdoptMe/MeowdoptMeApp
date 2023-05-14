from django.urls import path

from .views import (
    PermissionRequestList,
    PermissionRequestDetail,
    PermissionRequestCreate,
    PermissionRequestResolve,
)


urlpatterns = [
    path("", PermissionRequestList.as_view(), name="permission_request_list"),
    path(
        "<int:pk>/", PermissionRequestDetail.as_view(), name="permission_request_detail"
    ),
    path("make/", PermissionRequestCreate.as_view(), name="permission_request_create"),
    path(
        "<int:pk>/resolve/",
        PermissionRequestResolve.as_view(),
        name="permission_request_resolve",
    ),
    path(
        "shelters/<int:shelter_id>/",
        PermissionRequestList.as_view(),
        name="permission_request_list_shelter",
    ),
    path(
        "users/<int:user_id>/",
        PermissionRequestList.as_view(),
        name="permission_request_list_user",
    ),
]
