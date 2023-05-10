from django.urls import path

from .views import ShelterList, ShelterCreate, ShelterDetail, UserPermissionList, UserPermissionDetail, \
    UserPermissionCreate

urlpatterns = [
    path('', ShelterList.as_view(), name='shelter_list'),
    path('<int:pk>/', ShelterDetail.as_view(), name='shelter_detail'),
    path('add/', ShelterCreate.as_view(), name='shelter_create'),

    path('<int:shelter_id>/permissions/', UserPermissionList.as_view(), name='shelter_permission_list'),
    path('<int:shelter_id>/permissions/add/', UserPermissionCreate.as_view(), name='shelter_permission_create'),
    path('<int:shelter_id>/permissions/<int:pk>/', UserPermissionDetail.as_view(), name='shelter_permission_detail'),

    # path('<int:pk>/make_request/', RequestHandler.as_view(), name='make_request') # post
    # path('<int:pk>/resolve_request/', RequestHandler.as_view(), name='make_request') # post

]
