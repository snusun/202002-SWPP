from django.urls import path
from blog import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
    path('signout/', views.signout, name='signout'),
    path('article/', views.articleList, name='articleList'),
    path('article/<int:id>/', views.article, name='article'),
    path('article/<int:id>/comment/', views.comments, name='comments'),
    path('comment/<int:id>/', views.comment, name='comment'),
    path('token/', views.token, name='token'),
]
