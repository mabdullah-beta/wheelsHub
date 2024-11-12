from django.contrib import admin
from django.urls import include, path
from wheelshub import views


# Patch our app routes here
urlpatterns = [

    # Include our routes for /deals
    path('deals/', views.deals, name='deals'),
    path('deals/<uuid:deal_id>/', views.get_deal_by_id, name='get_deal_by_id'),
    path('deals/<uuid:deal_id>/bids/', views.create_bid, name='create_bid'),

    # Bid
    path('bids/<uuid:bid_id>/unlock', views.unlock_bid, name='unlock_bid'),
    path('bids/<uuid:bid_id>/accept', views.accept_bid, name='accept_bid'),
    path('bids/<uuid:bid_id>/activate', views.activate_bid, name='activate_bid'),

    # Auth routes
    path('auth/register/', views.register_user, name='register'),
    path('auth/login/', views.login_user, name='login'),
    path('auth/user/', views.get_user, name='get_user'),
    
    # Default routes
    path('admin/', admin.site.urls),
]
