from django.urls import path

from .views import UserList, UserDetail, UserCreate

urlpatterns = [
    path('', UserList.as_view(), name='user_list'),
    path('<int:pk>', UserDetail.as_view(), name='user_detail'),
    path('add/', UserCreate.as_view(), name='user_add'),
]
