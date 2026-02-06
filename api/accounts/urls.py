"""Account URLs."""

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import LogoutView

router = DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),
    path("auth/logout/", LogoutView.as_view(), name="logout"),
]
