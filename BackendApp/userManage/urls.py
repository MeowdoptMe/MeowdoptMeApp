from django.urls import path

from .views import UserList, UserDetail, UserCreate

urlpatterns = [
    path('', UserList.as_view(), name='user_list'),
    path('<int:pk>', UserDetail.as_view(), name='user_detail'),
    path('add/', UserCreate.as_view(), name='user_add'),
    path('<int:pk>/edit/', UserDetail.as_view(), name='user_edit'),  # add admin and user view
    path('<int:pk>/remove/', UserDetail.as_view(), name='user_remove'),
]
