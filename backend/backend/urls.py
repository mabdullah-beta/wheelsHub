from django.contrib import admin
from django.urls import include, path
from wheelshub import views

# Patch our app routes here
urlpatterns = [

    # Include our routes for /deals
    path('deals/', views.deals, name='deals'),
    path('deals/<uuid:deal_id>', views.get_deal_by_id, name='get_deal_by_id'),

    # Default routes
    path('admin/', admin.site.urls),
]
