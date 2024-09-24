# polls/models.py

from django.db import models

class User(models.Model):
    username = models.CharField(max_length=50)
    email = models.EmailField(unique=True)  # Ensure unique constraint
    password = models.CharField(max_length=50)


