"""Custom email classes for authentication emails."""

from django.conf import settings
from djoser.email import (
    ActivationEmail as BaseActivationEmail,
)
from djoser.email import (
    ConfirmationEmail as BaseConfirmationEmail,
)
from djoser.email import (
    PasswordChangedConfirmationEmail as BasePasswordChangedConfirmationEmail,
)
from djoser.email import (
    PasswordResetEmail as BasePasswordResetEmail,
)


def get_first_name(user) -> str:
    """Get the first name from full_name, or fall back to email."""
    if user and user.full_name:
        return user.full_name.split()[0]
    return user.email if user else ""


class ActivationEmail(BaseActivationEmail):
    """Custom activation email with frontend URL."""

    template_name = "accounts/email/activation.html"

    def get_context_data(self) -> dict:
        """Add frontend URL to context."""
        context = super().get_context_data()
        user = context.get("user")
        context["frontend_url"] = settings.FRONTEND_URL
        context["activation_url"] = (
            f"{settings.FRONTEND_URL}/activate/{context['uid']}/{context['token']}"
        )
        context["site_name"] = "Your App"
        context["user_display_name"] = get_first_name(user)
        return context


class ConfirmationEmail(BaseConfirmationEmail):
    """Custom confirmation email after activation."""

    template_name = "accounts/email/confirmation.html"

    def get_context_data(self) -> dict:
        """Add site name to context."""
        context = super().get_context_data()
        user = context.get("user")
        context["frontend_url"] = settings.FRONTEND_URL
        context["site_name"] = "Your App"
        context["user_display_name"] = get_first_name(user)
        return context


class PasswordResetEmail(BasePasswordResetEmail):
    """Custom password reset email with frontend URL."""

    template_name = "accounts/email/password_reset.html"

    def get_context_data(self) -> dict:
        """Add frontend URL to context."""
        context = super().get_context_data()
        user = context.get("user")
        context["frontend_url"] = settings.FRONTEND_URL
        context["password_reset_url"] = (
            f"{settings.FRONTEND_URL}/password-reset/{context['uid']}/{context['token']}"
        )
        context["site_name"] = "Your App"
        context["user_display_name"] = get_first_name(user)
        return context


class PasswordChangedConfirmationEmail(BasePasswordChangedConfirmationEmail):
    """Custom password changed confirmation email."""

    template_name = "accounts/email/password_changed_confirmation.html"

    def get_context_data(self) -> dict:
        """Add site name to context."""
        context = super().get_context_data()
        user = context.get("user")
        context["frontend_url"] = settings.FRONTEND_URL
        context["site_name"] = "Your App"
        context["user_display_name"] = get_first_name(user)
        return context
