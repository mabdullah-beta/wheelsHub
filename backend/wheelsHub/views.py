# Libs
from rest_framework.decorators import api_view
from rest_framework.response import Response


# Import db models 
from .models import Deal

# Extras
from .serializers import DealSerializer

# Get all deals
@api_view(['GET'])
def deals(request):

    # Request server to get all deals
    deals = Deal.objects.all().values()

    # Return json response
    return Response({ "success": True, "deals": list(deals) })

# Get deal by id
@api_view(['GET'])
def get_deal_by_id(request, deal_id):

    try:

        # Send request to db
        deal = Deal.objects.get(id=deal_id)

        # Serialize the object, because python objects cannot be passed without first converting them to dict
        serializer = DealSerializer(deal)

        # Return json
        return Response({ "success": True, "deal": serializer.data })

    except Deal.DoesNotExist:

        # Failed to get the data
        return Response({ "success": False }, status=404)
