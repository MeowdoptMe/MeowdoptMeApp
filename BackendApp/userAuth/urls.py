from django.urls import path
from .views import RegisterView, LogoutView, ChangePasswordView, UserList, UserCreate, UserDetail, ReturnTokenView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    #authentication
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', ReturnTokenView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('change_password/', ChangePasswordView.as_view(), name='change_password'),
    path('token_refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #crud
    path('<int:pk>', UserDetail.as_view(), name='user_detail'),
    path('users/', UserList.as_view(), name='user_list'),
    path('add/', UserCreate.as_view(), name='user_add'),
    path('<int:pk>/edit/', UserDetail.as_view(), name='user_edit'), #add admin and user view
    path('<int:pk>/remove/', UserDetail.as_view(), name='user_remove'),
]