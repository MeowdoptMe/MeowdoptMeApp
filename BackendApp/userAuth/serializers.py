from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField(required=False)

    def validate(self, attrs):
        data = super().validate(attrs.get)
        data["username"] = self.user.username
        data["email"] = self.user.email
        data["password"] = self.user.password
        return data


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}, "email": {"required": True}}

    def save(self):
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
