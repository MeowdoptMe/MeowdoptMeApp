from django.contrib import admin
from .models import PhotoAlbum, Photo


class PhotoAdmin(admin.ModelAdmin):
    list_display = ["img"]


admin.site.register(Photo, PhotoAdmin)
admin.site.register(PhotoAlbum)
