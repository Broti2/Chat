from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Message(models.Model):
    author_name = models.CharField(max_length=50)
    message_content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.author_name}: {self.message_content}"