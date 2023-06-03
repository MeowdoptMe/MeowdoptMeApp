from django_filters import FilterSet, CharFilter

from .models import Ad, PetCharacteristics, Pet


class AdFilter(FilterSet):
    species = CharFilter(field_name="pet__pet_characteristics__species")
    breed = CharFilter(field_name="pet__pet_characteristics__breed")
    gender = CharFilter(field_name="pet__pet_characteristics__gender")
    year = CharFilter(field_name="pet__pet_characteristics__date_of_birth__year")
    month = CharFilter(field_name="pet__pet_characteristics__date_of_birth__month")
    color = CharFilter(field_name="pet__pet_characteristics__color")

    class Meta:
        model = Ad
        fields = ["active", "pet", "shelter"]
