"""Users models."""

# Django
from django.contrib.auth.models import User
from django.db import models

# Utilities
import os

def user_directory_path(instance, filename):
    file_root, file_ext = os.path.splitext(filename)
    return f'users/profile_pictures/{instance.user.username}{file_ext}'


class Profile(models.Model):
    """Profile model.
    Proxy model that extends the base data with other information."""

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    website = models.URLField(max_length=200, blank=True)
    biography = models.TextField(blank=True)
    phone_number = models.CharField(max_length=20, blank=True)

    picture = models.ImageField(
        upload_to=user_directory_path,
        blank=True,
        null=True,
    )

    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        """Return username."""
        return self.user.username
