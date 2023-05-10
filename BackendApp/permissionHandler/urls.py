from django.urls import path

from .views import GroupPermissionList, GroupPermissionDetail

urlpatterns = [
    path(
        "groups/<int:group_id>/permissions/",
        GroupPermissionList.as_view(),
        name="group_permissions_list",
    ),
    path(
        "groups/<int:group_id>/permissions/<int:permission_id>/",
        GroupPermissionDetail.as_view(),
        name="group_permission_detail",
    ),
]
