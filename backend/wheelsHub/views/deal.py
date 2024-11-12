# Libs
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q


# Import db models 
from ..models import Deal

# Extras
from ..serializers import DealSerializer

# Get all deals
@api_view(['GET', 'POST'])
def deals(request):

    # Query deal
    if request.method == "GET":

        # Get query parameters
        title = request.GET.get('title', '')
        make = request.GET.get('make', '')
        year = request.GET.get('year')
        price_min = request.GET.get('price_min')
        price_max = request.GET.get('price_max')
        transmission = request.GET.get('transmission')
        location = request.GET.get('location', '')

        # Initialize query
        query = Q()

        # Filter based on title
        if title:

            query &= Q(title__icontains=title)
            
        # Filter based on make
        if make:

            query &= Q(make__icontains=make)
            
        # Filter based on year
        if year:

            query &= Q(year=year)
            
        # Filter based on price range
        if price_min and price_max:

            query &= Q(price__gte=price_min) & Q(price__lte=price_max)

        elif price_min:

            query &= Q(price__gte=price_min)

        elif price_max:

            query &= Q(price__lte=price_max)
            
        # Filter based on transmission
        if transmission:

            query &= Q(transmission=transmission)
            
        # Filter based on location
        if location:

            query &= Q(location__icontains=location)

        # Request server to get all deals
        deals = Deal.objects.filter(query)

        # Serialize data because it needs to converted from python object to json
        serializer = DealSerializer(deals, many=True)

        # Return json response
        return Response({ "success": True, "deals": serializer.data })

    # Create a deal
    elif request.method == "POST":

        # Validate auth
        if not request.user.is_authenticated:

            return Response({ "success": False }, status=401)

        # Get data from request
        data = request.data

        # Add details 
        data['seller'] = request.user.id 
        data["status"] = "pending"

        # Get the data from frontend
        serializer = DealSerializer(data=data)
        
        # Validate data
        if serializer.is_valid():

            # Create a new deal
            deal = serializer.save()  

            # Return id
            return Response({ "success": True, "deal": str(deal.id) })
        
        # Invalid
        return Response({ "success": False, "errors": serializer.errors }, status=400)

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