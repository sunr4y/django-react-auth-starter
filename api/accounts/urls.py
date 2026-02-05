"""Account URLs."""

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import APIKeyViewSet

router = DefaultRouter()
router.register("keys", APIKeyViewSet, basename="api-keys")

urlpatterns = [
    path("", include(router.urls)),
]
