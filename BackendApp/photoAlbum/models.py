from django.db import models

from adRelated.models import Ad


class Photo(models.Model):
    dir = models.CharField(max_length=255)
    ad = models.ForeignKey(
        Ad, on_delete=models.CASCADE, null=False, default=1, related_name="photos"
    )
