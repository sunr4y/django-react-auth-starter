"""Shared pytest fixtures."""

import pytest
from rest_framework.test import APIClient

from accounts.models import APIKey, User


@pytest.fixture
def api_client() -> APIClient:
    """Return an unauthenticated API client."""
    return APIClient()


@pytest.fixture
def user_data() -> dict:
    """Return valid user registration data."""
    return {
        "email": "test@example.com",
        "username": "testuser",
        "password": "SecurePass123!",
        "re_password": "SecurePass123!",
        "full_name": "Test User",
        "preferred_language": "python",
        "agreed_to_terms": True,
    }


@pytest.fixture
def user(db) -> User:
    """Create and return a test user."""
    return User.objects.create_user(
        email="user@example.com",
        username="testuser",
        password="TestPass123!",
        full_name="Test User",
        preferred_language="python",
        agreed_to_terms=True,
        is_active=True,
    )


@pytest.fixture
def inactive_user(db) -> User:
    """Create and return an inactive test user."""
    return User.objects.create_user(
        email="inactive@example.com",
        username="inactiveuser",
        password="TestPass123!",
        full_name="Inactive User",
        preferred_language="python",
        agreed_to_terms=True,
        is_active=False,
    )


@pytest.fixture
def authenticated_client(api_client: APIClient, user: User) -> APIClient:
    """Return an authenticated API client."""
    api_client.force_authenticate(user=user)
    return api_client


@pytest.fixture
def api_key(user: User) -> APIKey:
    """Create and return an API key for the test user."""
    return APIKey.objects.create(user=user, name="Test Key")
