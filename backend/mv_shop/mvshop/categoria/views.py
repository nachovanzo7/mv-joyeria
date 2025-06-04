from rest_framework import viewsets
from .models import Categoria
from .serializers import CategoriaSerializer
from rest_framework.permissions import AllowAny

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [AllowAny]
