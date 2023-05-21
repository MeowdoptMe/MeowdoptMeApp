from django.urls import path

from .views import (
    PhotoList,
    PhotoDetail,
    PhotoCreate,
)

urlpatterns = [
    path("<int:pk>/photos/", PhotoList.as_view(), name="photo_list"),
    path("<int:id>/photos/<int:pk>/", PhotoDetail.as_view(), name="photo_detail"),
    path("<int:id>/photos/add/", PhotoCreate.as_view(), name="photo_create"),
]
