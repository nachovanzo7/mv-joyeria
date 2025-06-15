from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import mercadopago
import os

@api_view(["POST"])
def create_preference(request):
    items = request.data.get("items")
    if not items:
        return Response({"error": "Faltan los items"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        preference_data = {
            "items": [
                {
                    "title": item["title"],
                    "quantity": int(item["quantity"]),
                    "unit_price": float(item["unit_price"]),
                    "currency_id": "UYU",
                }
                for item in items
            ]
        }
        key = os.getenv('MP_ACCESS_TOKEN')
        print(key)
        sdk = mercadopago.SDK(key)
        preference_response = sdk.preference().create(preference_data)
        preference = preference_response["response"]

        return Response({"preferenceId": preference["id"]})
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
