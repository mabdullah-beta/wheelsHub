from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Deal, Bid

class DealSerializer(serializers.ModelSerializer):

    class Meta:

        model = Deal
        fields = '__all__'  

class BidSerializer(serializers.ModelSerializer):

    class Meta:

        model = Bid
        fields = '__all__'  

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = User
        fields = ('username', 'password')

    def create(self, validated_data):

        # Create  anew user
        user = User(**validated_data)
        user.set_password(validated_data['password'])  # Hash the password

        # Save user
        user.save()
        
        return user