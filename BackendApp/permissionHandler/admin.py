from django.contrib import admin
from django.contrib.auth.admin import GroupAdmin

from .models import Manager, Volunteer, RegularUser, ShelterWorker, UserPermission, PermissionRequest

admin.site.register(Manager, GroupAdmin)
admin.site.register(Volunteer, GroupAdmin)
admin.site.register(RegularUser, GroupAdmin)
admin.site.register(ShelterWorker, GroupAdmin)
admin.site.register(UserPermission)
admin.site.register(PermissionRequest)
