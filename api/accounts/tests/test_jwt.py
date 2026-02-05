"""Tests for JWT authentication endpoints."""

import pytest
from rest_framework import status
from rest_framework.test import APIClient

from accounts.models import User


@pytest.mark.django_db
class TestJWTCreate:
    """Tests for POST /api/v1/auth/jwt/create/ endpoint."""

    url = "/api/v1/auth/jwt/create/"

    def test_login_success(self, api_client: APIClient, user: User):
        """Test successful login returns access and refresh tokens."""
        response = api_client.post(
            self.url,
            {"email": user.email, "password": "TestPass123!"},
            format="json",
        )
        assert response.status_code == status.HTTP_200_OK
        assert "access" in response.data
        assert "refresh" in response.data

    def test_login_with_wrong_password(self, api_client: APIClient, user: User):
        """Test login fails with wrong password."""
        response = api_client.post(
            self.url,
            {"email": user.email, "password": "WrongPassword123!"},
            format="json",
        )
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_login_with_nonexistent_email(self, api_client: APIClient):
        """Test login fails with nonexistent email."""
        response = api_client.post(
            self.url,
            {"email": "nonexistent@example.com", "password": "TestPass123!"},
            format="json",
        )
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_login_with_inactive_user(self, api_client: APIClient, inactive_user: User):
        """Test login fails for inactive user."""
        response = api_client.post(
            self.url,
            {"email": inactive_user.email, "password": "TestPass123!"},
            format="json",
        )
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_login_without_email(self, api_client: APIClient):
        """Test login fails without email."""
        response = api_client.post(
            self.url,
            {"password": "TestPass123!"},
            format="json",
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_login_without_password(self, api_client: APIClient, user: User):
        """Test login fails without password."""
        response = api_client.post(
            self.url,
            {"email": user.email},
            format="json",
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
class TestJWTRefresh:
    """Tests for POST /api/v1/auth/jwt/refresh/ endpoint."""

    url = "/api/v1/auth/jwt/refresh/"
    login_url = "/api/v1/auth/jwt/create/"

    def test_refresh_token_success(self, api_client: APIClient, user: User):
        """Test refreshing access token with valid refresh token."""
        # First login to get tokens
        login_response = api_client.post(
            self.login_url,
            {"email": user.email, "password": "TestPass123!"},
            format="json",
        )
        refresh_token = login_response.data["refresh"]

        # Refresh the token
        response = api_client.post(
            self.url,
            {"refresh": refresh_token},
            format="json",
        )
        assert response.status_code == status.HTTP_200_OK
        assert "access" in response.data
        assert "refresh" in response.data  # Token rotation enabled

    def test_refresh_with_invalid_token(self, api_client: APIClient):
        """Test refresh fails with invalid token."""
        response = api_client.post(
            self.url,
            {"refresh": "invalid-token"},
            format="json",
        )
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_refresh_without_token(self, api_client: APIClient):
        """Test refresh fails without token."""
        response = api_client.post(self.url, {}, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
class TestJWTVerify:
    """Tests for POST /api/v1/auth/jwt/verify/ endpoint."""

    url = "/api/v1/auth/jwt/verify/"
    login_url = "/api/v1/auth/jwt/create/"

    def test_verify_valid_token(self, api_client: APIClient, user: User):
        """Test verifying a valid access token."""
        # First login to get tokens
        login_response = api_client.post(
            self.login_url,
            {"email": user.email, "password": "TestPass123!"},
            format="json",
        )
        access_token = login_response.data["access"]

        # Verify the token
        response = api_client.post(
            self.url,
            {"token": access_token},
            format="json",
        )
        assert response.status_code == status.HTTP_200_OK

    def test_verify_invalid_token(self, api_client: APIClient):
        """Test verifying an invalid token fails."""
        response = api_client.post(
            self.url,
            {"token": "invalid-token"},
            format="json",
        )
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_verify_without_token(self, api_client: APIClient):
        """Test verify fails without token."""
        response = api_client.post(self.url, {}, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
