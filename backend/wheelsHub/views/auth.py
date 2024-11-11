# Libs
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import AccessToken

# Extras
from ..serializers import UserSerializer

# Register route
@api_view(['POST'])
@permission_classes([AllowAny]) 
def register_user(request):

    # Create a new user object
    serializer = UserSerializer(data=request.data)

    # Save user if the data is valid
    if serializer.is_valid():

        serializer.save()
        
        # Success
        return Response({ "success": True }, status=201)

    # Return error for invalid data
    return Response({ "success": False, "errors": serializer.errors }, status=422)

# Login route
@api_view(['POST'])
@permission_classes([AllowAny]) 
def login_user(request):

    # Get data
    username = request.data.get('username')
    password = request.data.get('password')
    
    # Login user
    user = authenticate(username=username, password=password)
    
    # If user exists
    if user is not None:

        # Get a token for user, this will create a new session
        access = AccessToken.for_user(user)

        return Response({ "success": True, "access": str(access) })

    # Return 401   
    return Response({ "success": False }, status=401)


# Profile
@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def get_user(request):

    # Return response
    return Response({ "success": True })