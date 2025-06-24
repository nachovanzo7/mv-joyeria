from django.db import models

class Categoria(models.Model):
    
    nombre = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=50, unique=True)
    
    def __str__(self):
        return self.nombre