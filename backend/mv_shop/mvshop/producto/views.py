# producto/views.py

from rest_framework import viewsets
from .models import Producto
from .serializers import ProductoSerializer
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Producto

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [AllowAny]

class ObtenerProductos(APIView):
    def get(self, request):
        productos = Producto.objects.all()
        serializer = ProductoSerializer(productos, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)