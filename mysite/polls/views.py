
from django.shortcuts import render, redirect
from .models import User
def success_view(request):
    return render(request, 'polls/success.html')

def signup(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirmPassword')

        # Check if passwords match
        if password != confirm_password:
            # You might want to handle this more gracefully, like showing an error message on the form
            return redirect('signup')  

        # Create a new user
        new_user = User(username=username, email=email, password=password)
        new_user.save()

        # You may want to redirect to a different page upon successful signup
        return redirect('success')

    return render(request, "polls/signupform.html")
