from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView,
    LogoutView,
    ChangePasswordView,
    LoginView,
    ChangeEmailView,
    PasswordTokenCheckView,
    PasswordResetEmailView,
    SetNewPasswordView,
)


urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("change-password/", ChangePasswordView.as_view(), name="change_password"),
    path("change-email/", ChangeEmailView.as_view(), name="change_email"),
    path("token-refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path(
        "request-password-reset/",
        PasswordResetEmailView.as_view(),
        name="request_password_reset",
    ),
    path(
        "password-reset/<uidb64>/<token>/",
        PasswordTokenCheckView.as_view(),
        name="password_reset_confirm",
    ),
    path(
        "password-reset-complete/",
        SetNewPasswordView.as_view(),
        name="password_reset_complete",
    ),
]
