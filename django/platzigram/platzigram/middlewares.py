"""Platzigram middlewares module."""

# Django
from django.shortcuts import redirect
from django.urls import reverse


class ProfileCopletionMiddleware:
    """Profile completion middleware.
    Ensure every user that is interacting with the platform
    have their profile picture and biography.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        """Code to be executed for each request before the view is called."""
        if not request.user.is_anonymous:
            profile = request.user.profile
            if not (profile.picture or profile.biography):
                urls = [
                    reverse('feed'),
                ]
                if request.path in urls:
                    return redirect('update_profile')
        response = self.get_response(request)
        return response
