"""Tests for API key endpoints."""

import pytest
from rest_framework import status
from rest_framework.test import APIClient

from accounts.models import APIKey, User


@pytest.mark.django_db
class TestListAPIKeys:
    """Tests for GET /api/v1/keys/ endpoint."""

    url = "/api/v1/keys/"

    def test_list_api_keys_authenticated(
        self, authenticated_client: APIClient, api_key: APIKey
    ):
        """Test listing API keys when authenticated."""
        response = authenticated_client.get(self.url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]["id"] == str(api_key.id)
        assert response.data[0]["name"] == api_key.name
        assert response.data[0]["prefix"] == api_key.prefix
        # Full key should not be exposed in list
        assert "key" not in response.data[0]

    def test_list_api_keys_empty(self, authenticated_client: APIClient):
        """Test listing API keys when user has none."""
        response = authenticated_client.get(self.url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 0

    def test_list_api_keys_unauthenticated(self, api_client: APIClient):
        """Test listing API keys fails when not authenticated."""
        response = api_client.get(self.url)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_list_only_own_api_keys(
        self, authenticated_client: APIClient, api_key: APIKey, db
    ):
        """Test user only sees their own API keys."""
        # Create another user with an API key
        other_user = User.objects.create_user(
            email="other@example.com",
            username="otheruser",
            password="TestPass123!",
            is_active=True,
        )
        APIKey.objects.create(user=other_user, name="Other Key")

        response = authenticated_client.get(self.url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]["id"] == str(api_key.id)


@pytest.mark.django_db
class TestCreateAPIKey:
    """Tests for POST /api/v1/keys/ endpoint."""

    url = "/api/v1/keys/"

    def test_create_api_key_success(self, authenticated_client: APIClient, user: User):
        """Test creating an API key."""
        response = authenticated_client.post(
            self.url,
            {"name": "My New Key"},
            format="json",
        )
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["name"] == "My New Key"
        assert "key" in response.data  # Full key returned on create
        assert response.data["key"].startswith("pk_live_")
        assert "prefix" in response.data

        # Verify key was created in database
        api_key = APIKey.objects.get(id=response.data["id"])
        assert api_key.user == user
        assert api_key.name == "My New Key"

    def test_create_api_key_with_default_name(
        self, authenticated_client: APIClient, user: User
    ):
        """Test creating an API key without name uses default."""
        response = authenticated_client.post(self.url, {}, format="json")
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["name"] == "Default"

    def test_create_api_key_unauthenticated(self, api_client: APIClient):
        """Test creating API key fails when not authenticated."""
        response = api_client.post(
            self.url,
            {"name": "My Key"},
            format="json",
        )
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_create_multiple_api_keys(
        self, authenticated_client: APIClient, user: User
    ):
        """Test user can create multiple API keys."""
        response1 = authenticated_client.post(
            self.url,
            {"name": "Key 1"},
            format="json",
        )
        response2 = authenticated_client.post(
            self.url,
            {"name": "Key 2"},
            format="json",
        )
        assert response1.status_code == status.HTTP_201_CREATED
        assert response2.status_code == status.HTTP_201_CREATED
        assert response1.data["key"] != response2.data["key"]

        assert APIKey.objects.filter(user=user).count() == 2


@pytest.mark.django_db
class TestRetrieveAPIKey:
    """Tests for GET /api/v1/keys/{id}/ endpoint."""

    def test_retrieve_api_key(self, authenticated_client: APIClient, api_key: APIKey):
        """Test retrieving a specific API key."""
        url = f"/api/v1/keys/{api_key.id}/"
        response = authenticated_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data["id"] == str(api_key.id)
        assert response.data["name"] == api_key.name
        # Full key should not be exposed in retrieve
        assert "key" not in response.data

    def test_retrieve_other_users_key(self, authenticated_client: APIClient, db):
        """Test cannot retrieve another user's API key."""
        other_user = User.objects.create_user(
            email="other@example.com",
            username="otheruser",
            password="TestPass123!",
            is_active=True,
        )
        other_key = APIKey.objects.create(user=other_user, name="Other Key")

        url = f"/api/v1/keys/{other_key.id}/"
        response = authenticated_client.get(url)
        assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db
class TestUpdateAPIKey:
    """Tests for PATCH /api/v1/keys/{id}/ endpoint."""

    def test_update_api_key_name(
        self, authenticated_client: APIClient, api_key: APIKey
    ):
        """Test updating API key name."""
        url = f"/api/v1/keys/{api_key.id}/"
        response = authenticated_client.patch(
            url,
            {"name": "Updated Name"},
            format="json",
        )
        assert response.status_code == status.HTTP_200_OK
        assert response.data["name"] == "Updated Name"

        api_key.refresh_from_db()
        assert api_key.name == "Updated Name"

    def test_update_other_users_key(self, authenticated_client: APIClient, db):
        """Test cannot update another user's API key."""
        other_user = User.objects.create_user(
            email="other@example.com",
            username="otheruser",
            password="TestPass123!",
            is_active=True,
        )
        other_key = APIKey.objects.create(user=other_user, name="Other Key")

        url = f"/api/v1/keys/{other_key.id}/"
        response = authenticated_client.patch(
            url,
            {"name": "Hacked Name"},
            format="json",
        )
        assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db
class TestDeleteAPIKey:
    """Tests for DELETE /api/v1/keys/{id}/ endpoint."""

    def test_delete_api_key_deactivates(
        self, authenticated_client: APIClient, api_key: APIKey
    ):
        """Test deleting API key deactivates it instead of deleting."""
        url = f"/api/v1/keys/{api_key.id}/"
        response = authenticated_client.delete(url)
        assert response.status_code == status.HTTP_204_NO_CONTENT

        # Key should still exist but be inactive
        api_key.refresh_from_db()
        assert api_key.is_active is False

    def test_delete_other_users_key(self, authenticated_client: APIClient, db):
        """Test cannot delete another user's API key."""
        other_user = User.objects.create_user(
            email="other@example.com",
            username="otheruser",
            password="TestPass123!",
            is_active=True,
        )
        other_key = APIKey.objects.create(user=other_user, name="Other Key")

        url = f"/api/v1/keys/{other_key.id}/"
        response = authenticated_client.delete(url)
        assert response.status_code == status.HTTP_404_NOT_FOUND

        # Key should still be active
        other_key.refresh_from_db()
        assert other_key.is_active is True

    def test_delete_unauthenticated(self, api_client: APIClient, api_key: APIKey):
        """Test deleting API key fails when not authenticated."""
        url = f"/api/v1/keys/{api_key.id}/"
        response = api_client.delete(url)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
