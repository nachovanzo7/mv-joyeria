# producto/views.py

from rest_framework import viewsets
from .serializers import ProductoSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Producto
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_control

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [AllowAny]

class ObtenerProductos(APIView):
    permission_classes = [AllowAny]

    @method_decorator(cache_control(public=True, max_age=300))
    def get(self, request):
        productos = Producto.objects.all()
        serializer = ProductoSerializer(productos, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)