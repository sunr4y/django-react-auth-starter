# Authentication API Documentation

Complete guide for frontend developers to integrate with the authentication system.

---

## Base URL

```
Development: http://localhost:8000/api/v1
Production:  https://api.example.com/api/v1
```

---

## Authentication Flow

```
1. User registers → Activation email sent
2. User clicks activation link → Account activated
3. User logs in → Receives JWT tokens (access + refresh)
4. User makes authenticated requests with access token
5. When access token expires → Use refresh token to get new access token
```

---

## Endpoints Overview

| Endpoint                              | Method | Auth Required | Description             |
| ------------------------------------- | ------ | ------------- | ----------------------- |
| `/auth/users/`                        | POST   | No            | Register new user       |
| `/auth/users/activation/`             | POST   | No            | Activate account        |
| `/auth/users/resend_activation/`      | POST   | No            | Resend activation email |
| `/auth/jwt/create/`                   | POST   | No            | Login (get tokens)      |
| `/auth/jwt/refresh/`                  | POST   | No            | Refresh access token    |
| `/auth/jwt/verify/`                   | POST   | No            | Verify token validity   |
| `/auth/users/reset_password/`         | POST   | No            | Request password reset  |
| `/auth/users/reset_password_confirm/` | POST   | No            | Confirm password reset  |
| `/auth/users/me/`                     | GET    | Yes           | Get current user        |
| `/auth/users/me/`                     | PATCH  | Yes           | Update current user     |
| `/auth/users/set_password/`           | POST   | Yes           | Change password         |

---

## 1. User Registration

### `POST /auth/users/`

Register a new user account. An activation email will be sent.

**Request Body:**

```json
{
  "email": "user@example.com",
  "username": "user",
  "password": "SecurePass123!",
  "re_password": "SecurePass123!",
  "full_name": "John Doe",
  "preferred_language": "python",
  "agreed_to_terms": true
}
```

**Fields:**

| Field                | Type    | Required | Description                                                       |
| -------------------- | ------- | -------- | ----------------------------------------------------------------- |
| `email`              | string  | Yes      | Valid email address                                               |
| `username`           | string  | Yes      | Username (frontend should derive from email, e.g., part before @) |
| `password`           | string  | Yes      | Min 8 chars, not common, not all numeric                          |
| `re_password`        | string  | Yes      | Must match password                                               |
| `full_name`          | string  | Yes      | User's full name                                                  |
| `preferred_language` | string  | Yes      | Programming language for code samples                             |
| `agreed_to_terms`    | boolean | Yes      | Must be `true`                                                    |

_Tip: Frontend can auto-generate `username` from email: `email.split('@')[0]`_

**Preferred Language Options:**

```
python, javascript, typescript, php, ruby, go, java, csharp, curl
```

**Success Response: `201 Created`**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "full_name": "John Doe",
  "preferred_language": "python"
}
```

**Error Response: `400 Bad Request`**

```json
{
  "email": ["user with this email already exists."],
  "password": ["This password is too common."],
  "full_name": ["Full name is required."],
  "agreed_to_terms": [
    "You must agree to the Terms of Service and Privacy Policy."
  ]
}
```

---

## 2. Account Activation

### `POST /auth/users/activation/`

Activate user account using the token from activation email.

**Frontend URL Pattern:**
The activation email contains a link to: `{FRONTEND_URL}/activate/{uid}/{token}`

Your frontend should extract `uid` and `token` from the URL and send them to this endpoint.

**Request Body:**

```json
{
  "uid": "MQ",
  "token": "c5p2fh-a1b2c3d4e5f6g7h8i9j0"
}
```

**Success Response: `204 No Content`**

**Error Response: `400 Bad Request`**

```json
{
  "uid": ["Invalid user id or user doesn't exist."],
  "token": ["Invalid token for given user."]
}
```

---

## 3. Resend Activation Email

### `POST /auth/users/resend_activation/`

Resend activation email if user didn't receive it or link expired.

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Success Response: `204 No Content`**

_Note: Returns 204 even if email doesn't exist (security measure)_

---

## 4. Login (Get Tokens)

### `POST /auth/jwt/create/`

Authenticate user and receive JWT tokens.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Success Response: `200 OK`**

```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Token Lifetimes:**

- Access token: 60 minutes
- Refresh token: 7 days

**Error Response: `401 Unauthorized`**

```json
{
  "detail": "No active account found with the given credentials"
}
```

_Note: This error appears if credentials are wrong OR account is not activated_

---

## 5. Refresh Access Token

### `POST /auth/jwt/refresh/`

Get a new access token using refresh token.

**Request Body:**

```json
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response: `200 OK`**

```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

_Note: Refresh token is also rotated (new one issued)_

**Error Response: `401 Unauthorized`**

```json
{
  "detail": "Token is invalid or expired",
  "code": "token_not_valid"
}
```

---

## 6. Verify Token

### `POST /auth/jwt/verify/`

Check if a token is still valid.

**Request Body:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response: `200 OK`**

```json
{}
```

**Error Response: `401 Unauthorized`**

```json
{
  "detail": "Token is invalid or expired",
  "code": "token_not_valid"
}
```

---

## 7. Request Password Reset

### `POST /auth/users/reset_password/`

Send password reset email to user.

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Success Response: `204 No Content`**

_Note: Returns 204 even if email doesn't exist (security measure)_

---

## 8. Confirm Password Reset

### `POST /auth/users/reset_password_confirm/`

Set new password using token from reset email.

**Frontend URL Pattern:**
The reset email contains a link to: `{FRONTEND_URL}/password-reset/{uid}/{token}`

**Request Body:**

```json
{
  "uid": "MQ",
  "token": "c5p2fh-a1b2c3d4e5f6g7h8i9j0",
  "new_password": "NewSecurePass123!",
  "re_new_password": "NewSecurePass123!"
}
```

**Success Response: `204 No Content`**

**Error Response: `400 Bad Request`**

```json
{
  "new_password": ["This password is too common."],
  "token": ["Invalid token for given user."]
}
```

---

## 9. Get Current User

### `GET /auth/users/me/`

Get authenticated user's profile.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Success Response: `200 OK`**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "full_name": "John Doe",
  "preferred_language": "python",
  "agreed_to_terms": true,
  "agreed_at": "2024-01-15T10:30:00Z",
  "date_joined": "2024-01-15T10:30:00Z"
}
```

**Error Response: `401 Unauthorized`**

```json
{
  "detail": "Authentication credentials were not provided."
}
```

---

## 10. Update Current User

### `PATCH /auth/users/me/`

Update authenticated user's profile.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body (partial update):**

```json
{
  "full_name": "Jane Doe",
  "preferred_language": "javascript"
}
```

**Updatable Fields:**

- `full_name`
- `preferred_language`

**Read-only Fields (cannot be updated):**

- `id`
- `email`
- `agreed_to_terms`
- `agreed_at`
- `date_joined`

**Success Response: `200 OK`**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "full_name": "Jane Doe",
  "preferred_language": "javascript",
  "agreed_to_terms": true,
  "agreed_at": "2024-01-15T10:30:00Z",
  "date_joined": "2024-01-15T10:30:00Z"
}
```

---

## 11. Change Password

### `POST /auth/users/set_password/`

Change password for authenticated user.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "current_password": "OldSecurePass123!",
  "new_password": "NewSecurePass456!",
  "re_new_password": "NewSecurePass456!"
}
```

**Success Response: `204 No Content`**

**Error Response: `400 Bad Request`**

```json
{
  "current_password": ["Invalid password."]
}
```

---

## Frontend Implementation Guide

### Storing Tokens

```typescript
// Store tokens after login
const login = async (email: string, password: string) => {
  const response = await fetch("/api/v1/auth/jwt/create/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  if (response.ok) {
    localStorage.setItem("access_token", data.access)
    localStorage.setItem("refresh_token", data.refresh)
  }

  return data
}
```

### Making Authenticated Requests

```typescript
// Add token to requests
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("access_token")

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  // Handle token expiration
  if (response.status === 401) {
    const refreshed = await refreshToken()
    if (refreshed) {
      // Retry request with new token
      return fetchWithAuth(url, options)
    } else {
      // Redirect to login
      window.location.href = "/login"
    }
  }

  return response
}
```

### Token Refresh Logic

```typescript
const refreshToken = async (): Promise<boolean> => {
  const refresh = localStorage.getItem("refresh_token")

  if (!refresh) return false

  const response = await fetch("/api/v1/auth/jwt/refresh/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  })

  if (response.ok) {
    const data = await response.json()
    localStorage.setItem("access_token", data.access)
    localStorage.setItem("refresh_token", data.refresh)
    return true
  }

  // Refresh token expired, clear storage
  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
  return false
}
```

### Logout

```typescript
const logout = () => {
  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
  window.location.href = "/login"
}
```

---

## Error Handling

All error responses follow this format:

```json
{
  "field_name": ["Error message 1", "Error message 2"],
  "another_field": ["Error message"]
}
```

Or for non-field errors:

```json
{
  "detail": "Error message",
  "code": "error_code"
}
```

### Common HTTP Status Codes

| Code | Meaning                              |
| ---- | ------------------------------------ |
| 200  | Success                              |
| 201  | Created                              |
| 204  | Success (no content)                 |
| 400  | Bad Request (validation error)       |
| 401  | Unauthorized (invalid/expired token) |
| 403  | Forbidden (no permission)            |
| 404  | Not Found                            |
| 429  | Too Many Requests (rate limited)     |

---

## Rate Limiting

| User Type     | Limit              |
| ------------- | ------------------ |
| Anonymous     | 100 requests/hour  |
| Authenticated | 1000 requests/hour |

When rate limited, you'll receive:

```json
{
  "detail": "Request was throttled. Expected available in X seconds."
}
```

---

## Frontend Routes to Implement

| Route                         | Purpose                             |
| ----------------------------- | ----------------------------------- |
| `/login`                      | Login form                          |
| `/register`                   | Registration form                   |
| `/activate/:uid/:token`       | Account activation handler          |
| `/forgot-password`            | Password reset request form         |
| `/password-reset/:uid/:token` | Password reset confirmation form    |
| `/dashboard`                  | Protected dashboard (requires auth) |
| `/settings`                   | User settings/profile page          |

---

## Testing with cURL

### Register

```bash
curl -X POST http://localhost:8000/api/v1/auth/users/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!",
    "re_password": "TestPass123!",
    "full_name": "Test User",
    "preferred_language": "python",
    "agreed_to_terms": true
  }'
```

### Login

```bash
curl -X POST http://localhost:8000/api/v1/auth/jwt/create/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!"
  }'
```

### Get Current User

```bash
curl -X GET http://localhost:8000/api/v1/auth/users/me/ \
  -H "Authorization: Bearer <access_token>"
```

---

## Swagger UI

Interactive API documentation is available at:

- **Swagger UI**: `http://localhost:8000/api/docs/`
- **ReDoc**: `http://localhost:8000/api/redoc/`
- **OpenAPI Schema**: `http://localhost:8000/api/schema/`
