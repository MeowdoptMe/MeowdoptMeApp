from rest_framework import serializers, status
from rest_framework.exceptions import AuthenticationFailed

from .models import User
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import (
    force_str,
)
from django.utils.http import urlsafe_base64_decode


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}, "email": {"required": True}}

    def save(self, **kwargs):
        user = User(
            email=self.validated_data["email"], username=self.validated_data["username"]
        )
        password = self.validated_data["password"]
        user.set_password(password)
        user.save()
        return user


class PasswordChangeSerializer(serializers.Serializer):
    current_password = serializers.CharField(
        style={"input_type": "password"}, required=True
    )
    new_password = serializers.CharField(
        style={"input_type": "password"}, required=True
    )

    def validate_current_password(self, value):
        if not self.context["request"].user.check_password(value):
            raise serializers.ValidationError({"current_password": "Does not match"})
        return value

    def update(self, instance, validated_data):
        raise NotImplementedError("PasswordChangeSerializer does not support update")

    def create(self, validated_data):
        raise NotImplementedError("PasswordChangeSerializer does not support create")


class EmailSerializer(serializers.Serializer):
    email = serializers.CharField(style={"input_type": "email"}, required=True)

    def update(self, instance, validated_data):
        raise NotImplementedError("EmailChangeSerializer does not support update")

    def create(self, validated_data):
        raise NotImplementedError("EmailChangeSerializer does not support create")

    def validate_email(self, value):
        try:
            User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("Email does not exist.")
        return value


class ResetPasswordEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    class Meta:
        fields = ["email"]


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        fields = ["password", "token", "uidb64"]

    def validate(self, attrs):
        try:
            password = attrs.get("password")
            token = attrs.get("token")
            uidb64 = attrs.get("uidb64")
            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed(
                    "The reset link is invalid", status.HTTP_401_UNAUTHORIZED
                )

            user.set_password(password)
            user.save()

            return super().validate(attrs)

        except Exception as e:
            raise AuthenticationFailed(
                "The reset link is invalid", status.HTTP_401_UNAUTHORIZED
            )
