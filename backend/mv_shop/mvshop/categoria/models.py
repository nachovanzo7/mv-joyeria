from django.db import models

class Categoria(models.Model):
    TIPOS_CATEGORIAS = [
        ('colgante', 'Colgante'),
        ('pulsera', 'Pulsera'),
        ('colgante', 'Colgante'),
        ('anillo', 'Anillo'),
        ('arete', 'Arete'),
    ]
    
    nombre = models.CharField(max_length=50, choices=TIPOS_CATEGORIAS, unique=True)
    slug = models.SlugField(max_length=50, unique=True)
    
    def __str__(self):
        return self.get_nombre_display()