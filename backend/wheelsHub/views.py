from django.http import JsonResponse

# First route to return hello world
def deals(request):

    # Our data
    data = {
        'name': 'John Doe',
        'age': 30,
        'email': 'john.doe@example.com'
    }

    return JsonResponse(data)