"""Tests for account models."""

import pytest
from django.utils import timezone

from accounts.models import APIKey, User


@pytest.mark.django_db
class TestUserModel:
    """Tests for User model."""

    def test_create_user(self):
        """Test creating a user with valid data."""
        user = User.objects.create_user(
            email="test@example.com",
            username="testuser",
            password="TestPass123!",
            full_name="Test User",
            preferred_language="python",
            agreed_to_terms=True,
        )
        assert user.email == "test@example.com"
        assert user.username == "testuser"
        assert user.full_name == "Test User"
        assert user.preferred_language == "python"
        assert user.agreed_to_terms is True
        assert user.check_password("TestPass123!")

    def test_user_str_representation(self, user: User):
        """Test user string representation returns email."""
        assert str(user) == user.email

    def test_agreed_at_set_when_agreed_to_terms(self):
        """Test agreed_at is set when user agrees to terms."""
        user = User.objects.create_user(
            email="terms@example.com",
            username="termsuser",
            password="TestPass123!",
            agreed_to_terms=True,
        )
        assert user.agreed_at is not None
        assert user.agreed_at <= timezone.now()

    def test_agreed_at_not_set_when_not_agreed(self):
        """Test agreed_at stays None when user hasn't agreed."""
        user = User.objects.create_user(
            email="noterms@example.com",
            username="notermsuser",
            password="TestPass123!",
            agreed_to_terms=False,
        )
        assert user.agreed_at is None

    def test_agreed_at_not_updated_on_subsequent_saves(self):
        """Test agreed_at is not updated when user is saved again."""
        user = User.objects.create_user(
            email="once@example.com",
            username="onceuser",
            password="TestPass123!",
            agreed_to_terms=True,
        )
        original_agreed_at = user.agreed_at

        # Save again
        user.full_name = "Updated Name"
        user.save()

        user.refresh_from_db()
        assert user.agreed_at == original_agreed_at

    def test_default_preferred_language(self):
        """Test default preferred language is Python."""
        user = User.objects.create_user(
            email="default@example.com",
            username="defaultuser",
            password="TestPass123!",
        )
        assert user.preferred_language == "python"

    def test_email_is_unique(self, user: User):
        """Test email must be unique."""
        from django.db import IntegrityError

        with pytest.raises(IntegrityError):
            User.objects.create_user(
                email=user.email,
                username="another",
                password="TestPass123!",
            )

    def test_programming_language_choices(self):
        """Test all programming language choices are valid."""
        valid_choices = [
            "python",
            "javascript",
            "typescript",
            "php",
            "ruby",
            "go",
            "java",
            "csharp",
            "curl",
        ]
        for lang in valid_choices:
            user = User.objects.create_user(
                email=f"{lang}@example.com",
                username=f"{lang}user",
                password="TestPass123!",
                preferred_language=lang,
            )
            assert user.preferred_language == lang


@pytest.mark.django_db
class TestAPIKeyModel:
    """Tests for APIKey model."""

    def test_create_api_key(self, user: User):
        """Test creating an API key generates key and prefix."""
        api_key = APIKey.objects.create(user=user, name="My API Key")
        assert api_key.key.startswith("pk_live_")
        assert len(api_key.key) == 56  # pk_live_ (8) + 48 hex chars
        assert api_key.prefix == api_key.key[:12]

    def test_api_key_str_representation(self, api_key: APIKey):
        """Test API key string representation."""
        expected = f"{api_key.name} ({api_key.prefix}...)"
        assert str(api_key) == expected

    def test_api_key_is_active_by_default(self, api_key: APIKey):
        """Test API key is active by default."""
        assert api_key.is_active is True

    def test_api_key_unique(self, user: User):
        """Test API keys are unique."""
        key1 = APIKey.objects.create(user=user, name="Key 1")
        key2 = APIKey.objects.create(user=user, name="Key 2")
        assert key1.key != key2.key

    def test_api_key_not_regenerated_on_save(self, api_key: APIKey):
        """Test API key is not regenerated when saved again."""
        original_key = api_key.key
        api_key.name = "Updated Name"
        api_key.save()
        api_key.refresh_from_db()
        assert api_key.key == original_key

    def test_api_key_default_name(self, user: User):
        """Test API key default name is 'Default'."""
        api_key = APIKey.objects.create(user=user)
        assert api_key.name == "Default"
