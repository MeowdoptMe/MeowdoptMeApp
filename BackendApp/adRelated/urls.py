from django.urls import path

from .views import AdList, AdCreate, AdDetail, PetCreate, PetDetail

urlpatterns = [
    path('', AdList.as_view(), name='ad_list'),  # get
    path('add/', AdCreate.as_view(), name='ad_create'),  # post
    path('<int:pk>/', AdDetail.as_view(), name='ad_detail'),  # get
    path('<int:pk>/remove/', AdDetail.as_view(), name='ad_remove'),  # delete
    path('<int:pk>/edit/', AdDetail.as_view(), name='ad_edit'),  # put
    path('<int:pk>/photo_album/', AdDetail.as_view(), name='ad_photo_album'),  # get
    path('<int:pk>/pet/', PetDetail.as_view(), name='pet_detail'),  # get
    path('<int:pk>/add_pet', PetCreate.as_view(), name='pet_create'),  # post
]
