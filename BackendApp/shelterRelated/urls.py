from django.urls import path

from .views import ShelterList, ShelterCreate, ShelterDetail, ContactInfoCreate, ContactInfoDetail

urlpatterns = [
    path('', ShelterList.as_view(), name='shelter_list'),  # get
    path('<int:pk>/', ShelterDetail.as_view(), name='shelter_detail'),  # get
    path('<int:pk>/associates/', ShelterDetail.as_view(), name='associates_list'),  # get
    path('<int:pk>/contact_info/', ContactInfoDetail.as_view(), name='contact_info_detail'),  # get
    path('<int:pk>/add_contact_info/', ContactInfoCreate.as_view(), name='contact_info_create'),  # post
    path('<int:pk>/edit_contact_info/', ContactInfoDetail.as_view(), name='contact_info_edit'),  # put
    path('<int:pk>/remove_contact_info/', ContactInfoDetail.as_view(), name='contact_info_remove'),  # delete
    path('add/', ShelterCreate.as_view(), name='shelter_create'),  # post
    path('<int:pk>/edit/', ShelterDetail.as_view(), name='shelter_edit'),  # put
    path('<int:pk>/remove/', ShelterDetail.as_view(), name='shelter_remove'),  # delete
    # path('<int:pk>/modify_associate/', AssociateDetail.as_view(), name='modify_associate'), #put
    # path('<int:pk>/make_request/', RequestHandler.as_view(), name='make_request') # post
    # path('<int:pk>/resolve_request/', RequestHandler.as_view(), name='make_request') # post
    # path('contact_info_list/', ContactInfoList.as_view(), name='contact_info_list'),  # get
]
