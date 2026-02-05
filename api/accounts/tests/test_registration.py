"""Tests for user registration endpoint."""

import pytest
from rest_framework import status
from rest_framework.test import APIClient

from accounts.models import User


@pytest.mark.django_db
class TestUserRegistration:
    """Tests for POST /api/v1/auth/users/ endpoint."""

    url = "/api/v1/auth/users/"

    def test_register_user_success(self, api_client: APIClient, user_data: dict):
        """Test successful user registration."""
        response = api_client.post(self.url, user_data, format="json")
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["email"] == user_data["email"]
        assert "password" not in response.data

        # Verify user was created in database
        user = User.objects.get(email=user_data["email"])
        assert user.full_name == user_data["full_name"]
        assert user.preferred_language == user_data["preferred_language"]
        assert user.agreed_to_terms is True

    def test_register_without_email(self, api_client: APIClient, user_data: dict):
        """Test registration fails without email."""
        del user_data["email"]
        response = api_client.post(self.url, user_data, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "email" in response.data

    def test_register_with_invalid_email(self, api_client: APIClient, user_data: dict):
        """Test registration fails with invalid email."""
        user_data["email"] = "invalid-email"
        response = api_client.post(self.url, user_data, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "email" in response.data

    def test_register_with_duplicate_email(
        self, api_client: APIClient, user_data: dict, user: User
    ):
        """Test registration fails with duplicate email."""
        user_data["email"] = user.email
        user_data["username"] = "newusername"
        response = api_client.post(self.url, user_data, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "email" in response.data

    def test_register_without_password(self, api_client: APIClient, user_data: dict):
        """Test registration fails without password."""
        del user_data["password"]
        response = api_client.post(self.url, user_data, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "password" in response.data

    def test_register_with_mismatched_passwords(
        self, api_client: APIClient, user_data: dict
    ):
        """Test registration fails when passwords don't match."""
        user_data["re_password"] = "DifferentPass123!"
        response = api_client.post(self.url, user_data, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "non_field_errors" in response.data

    def test_register_without_full_name(self, api_client: APIClient, user_data: dict):
        """Test registration fails without full name."""
        user_data["full_name"] = ""
        response = api_client.post(self.url, user_data, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "full_name" in response.data

    def test_register_with_whitespace_full_name(
        self, api_client: APIClient, user_data: dict
    ):
        """Test registration fails with whitespace-only full name."""
        user_data["full_name"] = "   "
        response = api_client.post(self.url, user_data, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "full_name" in response.data

    def test_register_without_agreed_to_terms(
        self, api_client: APIClient, user_data: dict
    ):
        """Test registration fails without agreeing to terms."""
        user_data["agreed_to_terms"] = False
        response = api_client.post(self.url, user_data, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "agreed_to_terms" in response.data

    def test_register_without_username(self, api_client: APIClient, user_data: dict):
        """Test registration fails without username."""
        del user_data["username"]
        response = api_client.post(self.url, user_data, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "username" in response.data

    def test_register_with_valid_preferred_language(
        self, api_client: APIClient, user_data: dict
    ):
        """Test registration with different valid programming languages."""
        languages = ["javascript", "typescript", "go", "java", "csharp", "curl"]
        for i, lang in enumerate(languages):
            user_data["email"] = f"user{i}@example.com"
            user_data["username"] = f"user{i}"
            user_data["preferred_language"] = lang
            response = api_client.post(self.url, user_data, format="json")
            assert response.status_code == status.HTTP_201_CREATED

            # Verify in database
            user = User.objects.get(email=user_data["email"])
            assert user.preferred_language == lang

    def test_register_with_invalid_preferred_language(
        self, api_client: APIClient, user_data: dict
    ):
        """Test registration fails with invalid programming language."""
        user_data["preferred_language"] = "invalid_language"
        response = api_client.post(self.url, user_data, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "preferred_language" in response.data

    def test_full_name_is_trimmed(self, api_client: APIClient, user_data: dict):
        """Test full name is trimmed of leading/trailing whitespace."""
        user_data["full_name"] = "  John Doe  "
        response = api_client.post(self.url, user_data, format="json")
        assert response.status_code == status.HTTP_201_CREATED

        user = User.objects.get(email=user_data["email"])
        assert user.full_name == "John Doe"
