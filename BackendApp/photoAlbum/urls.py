from django.urls import path

from .views import (
    PhotoAlbumList,
    PhotoAlbumCreate,
    PhotoAlbumDetail,
    PhotoList,
    PhotoDetail,
    PhotoCreate,
)

urlpatterns = [
    path("", PhotoAlbumList.as_view(), name="photo_album_list"),
    path("add/", PhotoAlbumCreate.as_view(), name="photo_album_create"),
    path("<int:pk>/", PhotoAlbumDetail.as_view(), name="photo_album_detail"),
    path("<int:pk>/photos/", PhotoList.as_view(), name="photo_list"),
    path("<int:id>/photos/<int:pk>/", PhotoDetail.as_view(), name="photo_detail"),
    path("<int:id>/photos/add/", PhotoCreate.as_view(), name="photo_create"),
]
