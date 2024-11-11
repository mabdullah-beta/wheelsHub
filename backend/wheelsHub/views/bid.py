# Libs
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# Import db models 
from ..models import Bid, Deal

# Create a big
@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def create_bid(request, deal_id):

    # Get data
    amount = request.data.get('amount')
    message = request.data.get('message', '')

    # Validate required fields
    if not amount:

        return Response({ "success": False, "message": "Amount is required" }, status=422)

    try:
        # Check if the deal exists (optional but recommended)
        deal = Deal.objects.get(id=deal_id)

        # Create a new bid instance
        bid = Bid(deal=deal.id, buyer=request.user.id, amount=amount, message=message, status='pending')

        # Save the bid to the database
        bid.save()

        # Return bid id
        return Response({ "success": True, "bid": bid.id })

    except Deal.DoesNotExist:

        return Response({ "success": False }, status=404)