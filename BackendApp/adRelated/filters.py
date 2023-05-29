from django_filters import FilterSet, CharFilter

from .models import Ad


class AdFilter(FilterSet):
    pet = CharFilter(field_name="pet")

    class Meta:
        model = Ad
        fields = ["pet"]

