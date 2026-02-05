"""Account views."""

from typing import TYPE_CHECKING

from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from .models import APIKey, User
from .serializers import APIKeyCreateSerializer, APIKeySerializer

if TYPE_CHECKING:
    from django.db.models import QuerySet


class APIKeyViewSet(viewsets.ModelViewSet):
    """ViewSet for managing API keys."""

    permission_classes = [IsAuthenticated]

    def get_queryset(self) -> "QuerySet[APIKey]":
        """Return API keys for current user."""
        user: User = self.request.user  # type: ignore[assignment]
        return APIKey.objects.filter(user=user)

    def get_serializer_class(self) -> type:
        """Return appropriate serializer based on action."""
        if self.action == "create":
            return APIKeyCreateSerializer
        return APIKeySerializer

    def destroy(self, request: Request, *args: object, **kwargs: object) -> Response:
        """Deactivate API key instead of deleting."""
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
