"""Tests for account models."""

import pytest
from django.utils import timezone

from accounts.models import User


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
            agreed_to_terms=True,
        )
        assert user.email == "test@example.com"
        assert user.username == "testuser"
        assert user.full_name == "Test User"
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

    def test_email_is_unique(self, user: User):
        """Test email must be unique."""
        from django.db import IntegrityError

        with pytest.raises(IntegrityError):
            User.objects.create_user(
                email=user.email,
                username="another",
                password="TestPass123!",
            )
