"""Forms users."""

# Django
from django import forms

# Models
from django.contrib.auth.models import User


class SignupForm(forms.Form):
    username = forms.CharField(min_length=4, max_length=50)
    passwd = forms.CharField(max_length=70, widget=forms.PasswordInput())
    passwd_confirmation = forms.CharField(
        max_length=70, widget=forms.PasswordInput())
    first_name = forms.CharField(min_length=2, max_length=50)
    last_name = forms.CharField(min_length=2, max_length=50)
    email = forms.CharField(
        min_length=6,
        max_length=70,
        widget=forms.EmailInput()
    )

    def clean_username(self):
        """Username must be unique"""
        username = self.cleaned_data['username']
        username_taken = User.objects.filter(username=username).exists()
        
        if username_taken:
            raise forms.ValidationError('Username is already in use.')
    
        return username


class ProfileForm(forms.Form):
    """Profile form."""
    website = forms.URLField(max_length=200, required=True)
    biography = forms.CharField(max_length=500, required=True)
    phone_number = forms.CharField(max_length=20, required=False)
    picture = forms.ImageField()
