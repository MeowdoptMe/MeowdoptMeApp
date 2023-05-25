from django import forms
from .models import Photo, PhotoAlbum


class PhotoUploadForm(forms.ModelForm):
    class Meta:
        model = Photo
        fields = ["img"]
