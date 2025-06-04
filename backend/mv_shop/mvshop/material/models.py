from django.db import models

class Material(models.Model):
    TIPOS_MATERIALES = [
        ('oro', 'Oro'),
        ('plata', 'Plata'),
        ('oro_bajo', 'Oro Bajo'),
    ]
    
    tipo = models.CharField("Tipo Material", max_length=50, choices=TIPOS_MATERIALES)
    
    def __str__(self):
        return self.get_tipo_display()
    