from django.urls import path
from .views import PhotoAlbumList

urlpatterns = [
    path('', PhotoAlbumList.as_view()),
]