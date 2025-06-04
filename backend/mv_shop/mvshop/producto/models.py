from django.db import models
from django.core.validators import MinValueValidator
from material.models import Material
from categoria.models import Categoria

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0.01)]
    )
    imagen = models.ImageField(upload_to='productos/')
    material = models.ForeignKey(
        Material,
        on_delete=models.SET_NULL,
        null=True,
        related_name='productos'
    )
    categorias = models.ManyToManyField(Categoria, related_name='productos')
    disponible = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre
    
    def mostrar_categorias(self):
        return ", ".join([categoria.nombre for categoria in self.categorias.all()])
    mostrar_categorias.short_description = 'Categorías'