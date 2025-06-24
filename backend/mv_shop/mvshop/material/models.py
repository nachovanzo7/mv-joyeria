from django.db import models

class Material(models.Model):
    
    tipo = models.CharField("Tipo Material", max_length=50)
    
    def __str__(self):
        return self.tipo
    