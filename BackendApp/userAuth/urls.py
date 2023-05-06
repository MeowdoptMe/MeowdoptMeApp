from django.urls import path
from .views import RegisterView, LogoutView, ChangePasswordView, ReturnTokenView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', ReturnTokenView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('change_password/', ChangePasswordView.as_view(), name='change_password'),
    path('token_refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
