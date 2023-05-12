from django.contrib import admin

from .models import (
    UserPermission,
    PermissionRequest,
)

admin.site.register(UserPermission)
admin.site.register(PermissionRequest)
