"""Tests for user profile endpoints."""

import pytest
from rest_framework import status
from rest_framework.test import APIClient

from accounts.models import User


@pytest.mark.django_db
class TestGetCurrentUser:
    """Tests for GET /api/v1/auth/users/me/ endpoint."""

    url = "/api/v1/auth/users/me/"

    def test_get_current_user_authenticated(
        self, authenticated_client: APIClient, user: User
    ):
        """Test getting current user when authenticated."""
        response = authenticated_client.get(self.url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data["id"] == str(user.id)
        assert response.data["email"] == user.email
        assert response.data["full_name"] == user.full_name
        assert response.data["agreed_to_terms"] == user.agreed_to_terms

    def test_get_current_user_unauthenticated(self, api_client: APIClient):
        """Test getting current user fails when not authenticated."""
        response = api_client.get(self.url)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_password_not_in_response(
        self, authenticated_client: APIClient, user: User
    ):
        """Test password is not included in response."""
        response = authenticated_client.get(self.url)
        assert "password" not in response.data


@pytest.mark.django_db
class TestUpdateCurrentUser:
    """Tests for PATCH /api/v1/auth/users/me/ endpoint."""

    url = "/api/v1/auth/users/me/"

    def test_update_full_name(self, authenticated_client: APIClient, user: User):
        """Test updating full name."""
        response = authenticated_client.patch(
            self.url,
            {"full_name": "New Name"},
            format="json",
        )
        assert response.status_code == status.HTTP_200_OK
        assert response.data["full_name"] == "New Name"

        user.refresh_from_db()
        assert user.full_name == "New Name"

    def test_update_full_name_multiple_times(
        self, authenticated_client: APIClient, user: User
    ):
        """Test updating full name multiple times."""
        response = authenticated_client.patch(
            self.url,
            {"full_name": "First Update"},
            format="json",
        )
        assert response.status_code == status.HTTP_200_OK
        assert response.data["full_name"] == "First Update"

        response = authenticated_client.patch(
            self.url,
            {"full_name": "Second Update"},
            format="json",
        )
        assert response.status_code == status.HTTP_200_OK
        assert response.data["full_name"] == "Second Update"

        user.refresh_from_db()
        assert user.full_name == "Second Update"

    def test_cannot_update_email(self, authenticated_client: APIClient, user: User):
        """Test email cannot be updated (read-only)."""
        original_email = user.email
        response = authenticated_client.patch(
            self.url,
            {"email": "newemail@example.com"},
            format="json",
        )
        # Should succeed but email unchanged
        assert response.status_code == status.HTTP_200_OK
        assert response.data["email"] == original_email

        user.refresh_from_db()
        assert user.email == original_email

    def test_cannot_update_agreed_to_terms(
        self, authenticated_client: APIClient, user: User
    ):
        """Test agreed_to_terms cannot be updated (read-only)."""
        response = authenticated_client.patch(
            self.url,
            {"agreed_to_terms": False},
            format="json",
        )
        assert response.status_code == status.HTTP_200_OK

        user.refresh_from_db()
        assert user.agreed_to_terms is True  # Still true

    def test_update_unauthenticated(self, api_client: APIClient):
        """Test updating fails when not authenticated."""
        response = api_client.patch(
            self.url,
            {"full_name": "New Name"},
            format="json",
        )
        assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
class TestSetPassword:
    """Tests for POST /api/v1/auth/users/set_password/ endpoint."""

    url = "/api/v1/auth/users/set_password/"

    def test_change_password_success(self, authenticated_client: APIClient, user: User):
        """Test successfully changing password."""
        response = authenticated_client.post(
            self.url,
            {
                "current_password": "TestPass123!",
                "new_password": "NewSecurePass456!",
                "re_new_password": "NewSecurePass456!",
            },
            format="json",
        )
        assert response.status_code == status.HTTP_204_NO_CONTENT

        # Verify new password works
        user.refresh_from_db()
        assert user.check_password("NewSecurePass456!")

    def test_change_password_wrong_current(
        self, authenticated_client: APIClient, user: User
    ):
        """Test changing password fails with wrong current password."""
        response = authenticated_client.post(
            self.url,
            {
                "current_password": "WrongPassword!",
                "new_password": "NewSecurePass456!",
                "re_new_password": "NewSecurePass456!",
            },
            format="json",
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_change_password_mismatch(
        self, authenticated_client: APIClient, user: User
    ):
        """Test changing password fails when new passwords don't match."""
        response = authenticated_client.post(
            self.url,
            {
                "current_password": "TestPass123!",
                "new_password": "NewSecurePass456!",
                "re_new_password": "DifferentPass789!",
            },
            format="json",
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_change_password_unauthenticated(self, api_client: APIClient):
        """Test changing password fails when not authenticated."""
        response = api_client.post(
            self.url,
            {
                "current_password": "TestPass123!",
                "new_password": "NewSecurePass456!",
                "re_new_password": "NewSecurePass456!",
            },
            format="json",
        )
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
