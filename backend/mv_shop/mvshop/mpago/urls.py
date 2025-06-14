# urls.py de la app o del proyecto
from django.urls import path
from . import views   # ajustá el import según tu estructura

urlpatterns = [
    path("create_preference/", views.create_preference, name="create_preference"),
]
