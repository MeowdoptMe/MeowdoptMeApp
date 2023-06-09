# Generated by Django 4.2 on 2023-06-09 07:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("photoAlbum", "__first__"),
        ("shelterRelated", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="DateOfBirth",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("year", models.IntegerField(null=True)),
                ("month", models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name="PetCharacteristics",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("species", models.CharField(default="", max_length=255, null=True)),
                ("breed", models.CharField(default="", max_length=255, null=True)),
                ("gender", models.CharField(default="", max_length=255, null=True)),
                ("color", models.CharField(default="", max_length=255, null=True)),
                (
                    "dateOfBirth",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="adRelated.dateofbirth",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Pet",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(default="", max_length=255, null=True)),
                (
                    "petCharacteristics",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="adRelated.petcharacteristics",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Ad",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("active", models.BooleanField(null=True)),
                ("description", models.TextField(default="", null=True)),
                (
                    "pet",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="adRelated.pet",
                    ),
                ),
                (
                    "photoAlbum",
                    models.ForeignKey(
                        default="",
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="photoAlbum.photoalbum",
                    ),
                ),
                (
                    "shelter",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="shelterRelated.shelter",
                    ),
                ),
            ],
        ),
    ]
