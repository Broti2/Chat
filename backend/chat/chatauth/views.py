from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from .models import Message
import json


@csrf_exempt
def Signup(request):
    if request.method == 'POST':
        try:
            email = request.POST.get('gmail')
            username = request.POST.get('user')
            password = request.POST.get('password')

            # Check if all required fields are provided
            if not email or not username or not password:
                return JsonResponse({'message': 'All fields are required'}, status=400)

            # Check if a user with the provided username already exists
            if User.objects.filter(username=username).exists():
                return JsonResponse({'message': 'Username already taken!'}, status=400)

            # Create a new User object with the provided information
            user = User.objects.create_user(email=email, username=username)
            user.set_password(password)
            user.save()

            # Display an information message indicating successful account creation
            return JsonResponse({'message': 'Account created successfully'}, status=201)
        
        except Exception as e:
            # Log the exception (optional)
            print(f"Server error: {e}")
            return JsonResponse({'message': 'Internal Server Error'}, status=500)
    
    # For GET request or any other request method
    return JsonResponse({'message': 'Method not allowed'}, status=405)


@csrf_exempt
def Login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
         
        if not username or not password:
            return JsonResponse({'message': 'Username and password are required'}, status=400)

        if not User.objects.filter(username=username).exists():
            return JsonResponse({'message': 'Invalid Username'}, status=400)
         
        user = authenticate(username=username, password=password)
         
        if user is None:
            return JsonResponse({'message': 'Invalid Password'}, status=400)
        else:
            return JsonResponse({'message': 'Login successfully!'}, status=200)
     
    return JsonResponse({'message': 'Invalid request method'}, status=405)


@csrf_exempt
def add_message(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        author_name = data.get('name')
        message_content = data.get('content')
        if author_name and message_content:
            Message.objects.create(author_name=author_name, message_content=message_content)
            return JsonResponse({'message': 'Message added successfully'}, status=201)
        else:
            return JsonResponse({'error': 'Author name and message content are required'}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    

@csrf_exempt
def get(request):
    messages = Message.objects.all().values()  # Retrieve all messages from the database
    return JsonResponse(list(messages), safe=False)