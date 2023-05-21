from django.db import models

from adRelated.models import Ad


class Photo(models.Model):
    img = models.CharField(max_length=255)
    description = models.TextField()
    ad = models.ForeignKey(
        Ad, related_name="photos", on_delete=models.CASCADE, null=False, default=1
    )
