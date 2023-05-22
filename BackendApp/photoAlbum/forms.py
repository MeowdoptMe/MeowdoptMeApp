from django import forms
from .models import Photo


class PhotoUploadForm(forms.ModelForm):
    class Meta:
        model = Photo
        fields = ["img"]
