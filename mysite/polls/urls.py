from django.urls import path
from . import views
from .views import signup, success_view  

urlpatterns = [
    path("", views.signup, name="signup"),
     path('success/', success_view, name='success'),
]
