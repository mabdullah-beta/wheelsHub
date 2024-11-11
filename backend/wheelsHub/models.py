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
        ('pending', 'Pending'),
        ('closed', 'Closed')
    ])
    created_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        db_table = 'deals'



class CarListing(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    address = models.CharField(max_length=255)
    town_city = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    variant = models.CharField(max_length=50)
    mileage = models.CharField(max_length=50)
    asking_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'car_listings'  # This will create a table named 'car_listings'