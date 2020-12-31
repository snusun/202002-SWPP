from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth.models import User
from django.contrib import auth
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import Article, Comment
import json
from django.core.serializers.json import DjangoJSONEncoder

def signup(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = User.objects.create_user(username, '', password, is_staff=True)
        user.set_password(password)
        user.save()
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

def signin(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = auth.authenticate(request, username=username, password=password, is_staff=True)
        if user is not None:
            auth.login(request, user)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'])

def signout(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            auth.logout(request)
            return  HttpResponse(status=204)
        else: 
            return HttpResponse(status=401)
    else: 
        return HttpResponseNotAllowed(['GET'])

def articleList(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            article_all_list = [{'id': article.id, 'title': article.title, 'content': article.content, 'author': article.author.id} for article in Article.objects.all()]
            return JsonResponse(article_all_list, safe=False)
        else:
            return HttpResponse(status=401)
    elif request.method == 'POST':
        if request.user.is_authenticated:
            req_data = json.loads(request.body.decode())
            title = req_data['title']
            content = req_data['content']
            author = request.user
            article = Article(title=title, content=content, author=author)
            article.save()
            response_dict = {'id': article.id, 'title': title, 'content': content, 'author': author.id}
            return HttpResponse(json.dumps(response_dict), status=201)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])

def article(request, id):
    if request.method == 'GET':
        if request.user.is_authenticated:
            try:
                article = Article.objects.get(id=id)
            except Article.DoesNotExist:
                return HttpResponse(status=404)
            return JsonResponse({"title": article.title, "content": article.content, "author": article.author.id})
        else:
            return HttpResponse(status=401)
    elif request.method == 'PUT':
        if request.user.is_authenticated:
            try:
                article = Article.objects.get(id=id)
            except Article.DoesNotExist:
                return HttpResponse(status=404)
            if request.user.id == article.author.id:
                body = request.body.decode()
                article_title = json.loads(body)['title']
                article_content = json.loads(body)['content']
                article.title = article_title
                article.content = article_content
                article.save()
                response_dict = {'id': article.id, 'title': article.title, 'content': article.content, 'author': article.author.id}
                return HttpResponse(json.dumps(response_dict), status=200)
            else: 
                return HttpResponse(status=403)
        else:
            return HttpResponse(status=401)
    elif request.method == 'DELETE':
        if request.user.is_authenticated: 
            try:
                article = Article.objects.get(id=id)
            except Article.DoesNotExist:
                return HttpResponse(status=404)
            if request.user.id == article.author.id:
                article.delete() 
                return HttpResponse(status=200)
            else: 
                return HttpResponse(status=403)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])

def comments(request, id):
    if request.method == 'GET':
        if request.user.is_authenticated:
            try:
                article = Article.objects.get(id=id)
            except Article.DoesNotExist:
                return HttpResponse(status=404)
            comments = [{"article": comment.article.id, "content": comment.content, "author": comment.author.id} for comment in Comment.objects.filter(article = article)]
            return JsonResponse(comments, safe=False)
        else:
            return HttpResponse(status=401)
    elif request.method == 'POST':
        if request.user.is_authenticated:
            try:
                article = Article.objects.get(id=id)
            except Article.DoesNotExist:
                return HttpResponse(status=404)
            req_data = json.loads(request.body.decode())
            content = req_data['content']
            author = request.user
            comment = Comment(article=article, content=content, author=author)
            comment.save()
            response_dict = {"id": comment.id, "article": comment.article.id, "content": comment.content, "author": comment.author.id}
            return HttpResponse(json.dumps(response_dict), status=201)
        else:
            return HttpResponse(status=401)
    else: 
        return HttpResponseNotAllowed(['GET', 'POST'])

def comment(request, id):
    if request.method == 'GET':
        if request.user.is_authenticated:
            try:
                comment = Comment.objects.get(id=id)
            except Comment.DoesNotExist:
                return HttpResponse(status=404)
            return JsonResponse({"article": comment.article.id, "content": comment.content, "author": comment.author.id}, safe=False)
        else:
            return HttpResponse(status=401)
    elif request.method == 'PUT':
        if request.user.is_authenticated:
            try:
                comment = Comment.objects.get(id=id)
            except Comment.DoesNotExist:
                return HttpResponse(status=404)
            if request.user.id == comment.author.id:
                body = request.body.decode()
                comment_content = json.loads(body)['content'] 
                comment.content = comment_content
                comment.save()
                response_dict = {"id": comment.id, "article": comment.article.id, "content": comment.content, "author": comment.author.id}
                return HttpResponse(json.dumps(response_dict), status=200)
            else: 
                return HttpResponse(status=403)
        else:
            return HttpResponse(status=401)
    elif request.method == 'DELETE':
        if request.user.is_authenticated:
            try:
                comment = Comment.objects.get(id=id)
            except Comment.DoesNotExist:
                return HttpResponse(status=404)
            if request.user.id == comment.author.id: 
                comment.delete() 
                return HttpResponse(status=200)
            else: 
                return HttpResponse(status=403)   
        else:
            return HttpResponse(status=401)
    else: 
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])
