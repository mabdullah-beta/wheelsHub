# backend/mybackend/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # This will include your API urls
]

# backend/api/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # Add your API endpoints here
    path('test/', views.test_view, name='test'),  # Test endpoint
]

# backend/api/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def test_view(request):
    return Response({"message": "Backend is working!"})