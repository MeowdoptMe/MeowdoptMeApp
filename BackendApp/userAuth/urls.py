from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView,
    LogoutView,
    ChangePasswordView,
    LoginView,
    ChangeEmailView,
    ForgotPasswordView,
)


urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("change-password/", ChangePasswordView.as_view(), name="change_password"),
    path("change-email/", ChangeEmailView.as_view(), name="change_email"),
    path("forgot-password/", ForgotPasswordView.as_view(), name="forgot_password"),
    path("token-refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
