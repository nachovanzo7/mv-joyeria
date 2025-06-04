from rest_framework import viewsets, status
from .models import Material
from .serializers import MaterialSerializer
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response

class MaterialViewSet(viewsets.ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer
    permission_classes = [AllowAny]


class CrearMaterial(APIView):
    
    def post(self, request):
        serializer = MaterialSerializer(data=request.data)
        
        if serializer.is_valid():
            material = serializer.save()
            
            return Response(
                MaterialSerializer(material, context={'request': request}).data,
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)