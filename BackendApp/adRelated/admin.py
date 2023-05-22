from django.contrib import admin

from .models import Pet, PetCharacteristics, DateOfBirth, Ad

admin.site.register(Pet)
admin.site.register(PetCharacteristics)
admin.site.register(DateOfBirth)
admin.site.register(Ad)
