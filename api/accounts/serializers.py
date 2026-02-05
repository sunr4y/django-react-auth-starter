"""Account serializers."""

from typing import Any

from djoser.serializers import (
    UserCreatePasswordRetypeSerializer as BaseUserCreateSerializer,
)
from djoser.serializers import UserSerializer as BaseUserSerializer
from rest_framework import serializers

from .models import User


class UserCreateSerializer(BaseUserCreateSerializer):
    """Serializer for user registration with password confirmation."""

    full_name = serializers.CharField(required=True, allow_blank=False)
    preferred_language = serializers.ChoiceField(
        choices=User.ProgrammingLanguage.choices,
        required=False,
        default="python",
    )
    agreed_to_terms = serializers.BooleanField(required=True)

    class Meta(BaseUserCreateSerializer.Meta):
        """Meta options."""

        model = User
        fields = tuple(BaseUserCreateSerializer.Meta.fields) + (
            "full_name",
            "preferred_language",
            "agreed_to_terms",
        )

    def validate_agreed_to_terms(self, value: bool) -> bool:
        """Ensure user agrees to terms of service."""
        if not value:
            raise serializers.ValidationError(
                "You must agree to the Terms of Service and Privacy Policy."
            )
        return value

    def validate_full_name(self, value: str) -> str:
        """Ensure full name is provided."""
        if not value or not value.strip():
            raise serializers.ValidationError("Full name is required.")
        return value.strip()

    def perform_create(self, validated_data: dict[str, Any]) -> User:
        """Create user with extra fields."""
        # Extract our custom fields before calling parent
        full_name = validated_data.pop("full_name", "")
        preferred_language = validated_data.pop("preferred_language", "python")
        agreed_to_terms = validated_data.pop("agreed_to_terms", False)

        # Create user using parent method
        user = super().perform_create(validated_data)

        # Set extra fields
        user.full_name = full_name
        user.preferred_language = preferred_language
        user.agreed_to_terms = agreed_to_terms
        user.save(update_fields=["full_name", "preferred_language", "agreed_to_terms"])

        return user


class UserSerializer(BaseUserSerializer):
    """Serializer for user data."""

    class Meta(BaseUserSerializer.Meta):
        """Meta options."""

        model = User
        fields = (
            "id",
            "email",
            "full_name",
            "preferred_language",
            "agreed_to_terms",
            "agreed_at",
            "date_joined",
        )
        read_only_fields = (
            "id",
            "email",
            "agreed_to_terms",
            "agreed_at",
            "date_joined",
        )
