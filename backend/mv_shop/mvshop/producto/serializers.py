from rest_framework import serializers
from categoria.models import Categoria
from material.models import Material
from .models import Producto
from material.serializers import MaterialSerializer
from categoria.serializers import CategoriaSerializer


class ProductoSerializer(serializers.ModelSerializer):
    categorias = CategoriaSerializer(many=True, read_only=True)
    material = MaterialSerializer(read_only=True)

    class Meta:
        model = Producto
        fields = '__all__'
        ref_name = 'ProductoSerializer'
