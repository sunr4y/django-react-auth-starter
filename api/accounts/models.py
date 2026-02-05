"""Account models - User."""

import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    """Custom user model with email as the primary identifier."""

    class ProgrammingLanguage(models.TextChoices):
        """Supported programming languages for code samples."""

        PYTHON = "python", "Python"
        JAVASCRIPT = "javascript", "JavaScript"
        TYPESCRIPT = "typescript", "TypeScript"
        PHP = "php", "PHP"
        RUBY = "ruby", "Ruby"
        GO = "go", "Go"
        JAVA = "java", "Java"
        CSHARP = "csharp", "C#"
        CURL = "curl", "cURL"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255, blank=True)
    preferred_language = models.CharField(
        max_length=20,
        choices=ProgrammingLanguage.choices,
        default=ProgrammingLanguage.PYTHON,
    )
    agreed_to_terms = models.BooleanField(default=False)
    agreed_at = models.DateTimeField(null=True, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    class Meta:
        """Meta options."""

        indexes = [
            models.Index(fields=["email"]),
        ]

    def save(self, *args, **kwargs) -> None:  # type: ignore[override]
        """Set agreed_at timestamp when user agrees to terms."""
        if self.agreed_to_terms and not self.agreed_at:
            self.agreed_at = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        """Return string representation."""
        return self.email
