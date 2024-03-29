"""Posts views."""

# Django
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render

# Utilities
from datetime import datetime

# Forms
from posts.forms import PostForm

# Models
from posts.models import Post


@login_required
def list_posts(request):
    """List existing posts."""
    posts = Post.objects.all().order_by('-created')
    return render(request, 'posts/feed.html', {'posts': posts})


@login_required
def create_posts(request):
    """Create new post view"""
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('feed')
    else:
        form = PostForm()

    return render(
        request=request,
        template_name='posts/new.html',
        context={
            'form': form,
            'user': request.user,
            'profile': request.user.profile,
        }
    )
