from rest_framework import serializers
from .models import User


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
