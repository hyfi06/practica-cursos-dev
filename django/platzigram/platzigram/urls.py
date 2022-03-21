"""Platzigram URLs module. """

# Django
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from platzigram import views as local_views
from posts import views as posts_views

urlpatterns = [
    path('hello-world/', local_views.hello_word),
    path('hi/', local_views.hi),
    path('hi/<str:name>/<int:age>/', local_views.say_hi),
    path('sort/', local_views.sorted_numbers),
    path('admin/', admin.site.urls),
    path('posts/', posts_views.list_posts)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
