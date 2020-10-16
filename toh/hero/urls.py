from django.urls import path

from . import views

urlpatterns = [
    #path('', views.index, name='index'),
    path('<int:id>/', views.hero_id, name='heroId'),
    path('<str:name>/', views.hero_name, name='heroName'),
    path('', views.hero_list),
    path('info/<int:id>/', views.hero_info, name='heroInfo')
]