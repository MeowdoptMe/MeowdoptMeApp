from django.urls import path

from .views import AdList, AdCreate, AdDetail, PetCreate, PetDetail

urlpatterns = [
    path('', AdList.as_view(), name='ad_list'),  # get
    path('add/', AdCreate.as_view(), name='ad_create'),  # post
    path('<int:pk>/', AdDetail.as_view(), name='ad_detail'),  # get
    path('<int:pk>/pet/', PetDetail.as_view(), name='pet_detail'),  # get
    path('<int:pk>/add-pet', PetCreate.as_view(), name='pet_create'),  # post
]
