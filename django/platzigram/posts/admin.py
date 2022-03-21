"""Post admin classes."""

from re import search
from django.contrib import admin

# Models
from posts.models import Post


@admin.register(Post)
class ProfileAdmin(admin.ModelAdmin):
    """Post admin."""
    list_display = ('pk', 'title', 'user', 'created', 'modified')
    list_display_links = ('pk', 'title')
    search_fields = (
        'title',
        'user__username'
        'user__email',
    )
    list_filter = (
        'created',
        'modified'
    )
