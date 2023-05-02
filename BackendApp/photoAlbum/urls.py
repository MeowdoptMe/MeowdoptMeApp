from django.urls import path
from .views import PhotoAlbumList, PhotoAlbumCreate, PhotoAlbumDetail, PhotoList, PhotoDetail

urlpatterns = [
    path('', PhotoAlbumList.as_view(), name='photo_album_list'),
    path('add/', PhotoAlbumCreate.as_view(), name='photo_album_create'),
    path('<int:pk>/', PhotoAlbumDetail.as_view(), name='photo_album_detail'),
    path('<int:pk>/remove/', PhotoAlbumDetail.as_view(), name='photo_album_remove'),
    path('<int:pk>/edit/', PhotoAlbumDetail.as_view(), name='photo_album_edit'),
    path('<int:pk>/photos/', PhotoList.as_view(), name='photo_list'),
    path('photos/<int:pk>/', PhotoDetail.as_view(), name='photo_detail'),
]