from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import uuid

# Core model for a deal
class Deal(models.Model):

    # Id of a new deal
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    seller = models.UUIDField()

    # User specific details
    title = models.TextField()
    description = models.TextField()

    # Core specifications
    price = models.DecimalField(max_digits=10, decimal_places=2)
    make = models.TextField()
    model = models.TextField()
    year = models.PositiveIntegerField()
    mileage = models.PositiveIntegerField()

    # Other details
    condition = models.CharField(max_length=20)
    location = models.TextField()
    fuel_type = models.CharField(max_length=20, choices=[
        ('gasoline', 'Gasoline'),
        ('diesel', 'Diesel'),
        ('electric', 'Electric'),
        ('hybrid', 'Hybrid')
    ])
    transmission = models.CharField(max_length=20, choices=[
        ('automatic', 'Automatic'),
        ('manual', 'Manual')
    ])
    body_type = models.CharField(max_length=20, choices=[
        ('sedan', 'Sedan'),
        ('suv', 'SUV'),
        ('hatchback', 'Hatchback'),
        ('truck', 'Truck'),
        ('coupe', 'Coupe'),
        ('convertible', 'Convertible')
    ])
    engine_capacity = models.DecimalField(max_digits=3, decimal_places=1)
    image = models.TextField()

    # Internal
    status = models.CharField(max_length=20, choices=[
        ('active', 'Active'),
        ('sold', 'Sold'),
        ('closed', 'Closed')
    ])
    created_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        db_table = 'deals'

class Bid(models.Model):
    
    # Automatically generate a unique UUID for each bid
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # UUIDs for the deal and buyer
    deal = models.UUIDField()
    buyer = models.UUIDField()

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    message = models.TextField(blank=True, null=True)
    contact = models.CharField(max_length=15, null=False)

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('placed', 'Placed'),
        ('accepted', 'Accepted')
    ]
    
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'bids'
