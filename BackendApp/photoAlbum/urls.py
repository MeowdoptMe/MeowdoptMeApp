from django.urls import path

from .views import (
    PhotoAlbumList,
    PhotoAlbumCreate,
    PhotoAlbumDetail,
    PhotoList,
    PhotoDetail,
)

urlpatterns = [
    path("", PhotoAlbumList.as_view(), name="photo_album_list"),  # get
    path("add/", PhotoAlbumCreate.as_view(), name="photo_album_create"),  # post
    path("<int:pk>/", PhotoAlbumDetail.as_view(), name="photo_album_detail"),  # get
    path("<int:pk>/photos/", PhotoList.as_view(), name="photo_list"),  # get
    path(
        "<int:id>/photos/<int:pk>/", PhotoDetail.as_view(), name="photo_detail"
    ),  # get
]
