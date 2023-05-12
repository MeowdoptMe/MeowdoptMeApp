from rest_framework import serializers

from .models import UserPermission, PermissionRequest


class UserPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPermission
        fields = ["user", "shelter", "permission"]


class PermissionRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PermissionRequest
        fields = ["user", "shelter", "permission"]
