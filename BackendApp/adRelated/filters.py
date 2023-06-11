from django_filters import FilterSet, CharFilter

from .models import Ad, PetCharacteristics, Pet


class AdFilter(FilterSet):
    species = CharFilter(field_name="pet__petCharacteristics__species")
    breed = CharFilter(field_name="pet__petCharacteristics__breed")
    gender = CharFilter(field_name="pet__petCharacteristics__gender")
    year = CharFilter(field_name="pet__petCharacteristics__dateOfBirth__year")
    month = CharFilter(field_name="pet__petCharacteristics__dateOfBirth__month")
    color = CharFilter(field_name="pet__petCharacteristics__color")
    shelter = CharFilter(field_name="shelter")
    class Meta:
        model = Ad
        fields = ["active", "pet", "shelter"]
