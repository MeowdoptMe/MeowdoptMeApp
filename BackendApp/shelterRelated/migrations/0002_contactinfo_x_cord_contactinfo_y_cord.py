# Generated by Django 4.2 on 2023-04-30 14:29

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("shelterRelated", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="contactinfo",
            name="x_cord",
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name="contactinfo",
            name="y_cord",
            field=models.FloatField(default=0),
        ),
    ]