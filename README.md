# Django + React Auth Starter

A production-ready authentication starter with Django REST Framework and React. JWT authentication, email verification, password reset - all wired up and ready to go.

**Full Tutorial:** [Read the blog post](https://www.bhusalmanish.com.np/blog/posts/django-react-auth-starter.html)

## Features

- JWT authentication with automatic token refresh & rotation
- Email verification flow
- Password reset with secure tokens
- Custom User model (UUID primary key, email-based login)
- Protected & guest route guards
- Rate limiting & production security headers
- Swagger/ReDoc API documentation

## Tech Stack

**Backend:** Django 5.2, Django REST Framework, SimpleJWT, Djoser, PostgreSQL

**Frontend:** React 19, TypeScript, Vite, TanStack Query, Axios, Tailwind CSS, Radix UI

## Quick Start

### Backend

```bash
cd api
python -m venv .venv

# Windows
.venv\Scripts\activate

# Mac/Linux
source .venv/bin/activate

pip install -r requirements/dev.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```

Backend runs at `http://localhost:8000`

### Frontend

```bash
cd web
npm install
cp .env.example .env
npm run dev
```

Frontend runs at `http://localhost:5173`

> Both servers need to run simultaneously. CORS is pre-configured.

## API Documentation

Available in development mode:

- **Swagger UI:** http://localhost:8000/api/docs/
- **ReDoc:** http://localhost:8000/api/redoc/
- **OpenAPI Schema:** http://localhost:8000/api/schema/

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/users/` | Register |
| POST | `/api/v1/auth/jwt/create/` | Login |
| POST | `/api/v1/auth/jwt/refresh/` | Refresh token |
| POST | `/api/v1/auth/users/activation/` | Activate account |
| POST | `/api/v1/auth/users/reset_password/` | Request password reset |
| POST | `/api/v1/auth/users/reset_password_confirm/` | Confirm password reset |
| GET | `/api/v1/auth/users/me/` | Get current user |

## Project Structure

```
django-react-auth-starter/
├── api/                    # Django backend
│   ├── accounts/           # User model, serializers, emails
│   ├── config/
│   │   └── settings/
│   │       ├── base.py
│   │       ├── development.py
│   │       └── production.py
│   └── requirements/
└── web/                    # React frontend
    └── src/
        ├── components/auth/    # ProtectedRoute, GuestRoute
        ├── context/            # AuthContext
        ├── hooks/              # useAuth, useAuthMutations
        ├── lib/                # API client, auth API
        └── pages/auth/         # Login, Signup, etc.
```

## Running Tests

```bash
cd api
pytest
```

## Deployment

For a complete production deployment guide with Docker, Nginx, and free SSL, check out: [Deploy Django REST Framework to Production](https://www.bhusalmanish.com.np/blog/posts/deploy-drf-production.html)

## License

MIT

## Author

**Manish Bhusal** - [@maniishbhusal](https://twitter.com/maniishbhusal)
