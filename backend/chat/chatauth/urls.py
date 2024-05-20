from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.Signup,name='signup'),
    path('login/', views.Login,name='login'),
    path('add/', views.add_message,name='add_msg'),
    path('msg/', views.get,name='get_msg'),
]
