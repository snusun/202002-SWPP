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
        return HttpResponse(json.dumps({"username": username, "password": password}), status=201)
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
        if request is not None:
            auth.logout(request)
            return  HttpResponse(status=204)
        else: 
            return HttpResponse(status=401)
    else: 
        return HttpResponseNotAllowed(['GET'])

def articleList(request):
    if request.user.is_authenticated:
        if request.method == 'GET':
            article_all_list = [{'id': article.id, 'title': article.title, 'content': article.content, 'author': article.author.id} for article in Article.objects.all()]
            return JsonResponse(article_all_list, safe=False)
        elif request.method == 'POST':
            req_data = json.loads(request.body.decode())
            title = req_data['title']
            content = req_data['content']
            author = request.user
            article = Article(title=title, content=content, author=author)
            article.save()
            response_dict = {'title': title, 'content': content, 'author': author.id}
            return HttpResponse(json.dumps(response_dict), status=201)
        else:
            return HttpResponseNotAllowed(['GET', 'POST'])
    else:
        return HttpResponse(status=401)


def article(request, id):
    if request.user.is_authenticated:
        if request.method == 'GET':
            try:
                article = Article.objects.get(id=id)
            except Article.DoesNotExist:
                return HttpResponse(status=404)
            return JsonResponse({"title": article.title, "content": article.content, "author": article.author.id})
        elif request.method == 'PUT':
            try:
                article = Article.objects.get(id=id)
            except Article.DoesNotExist:
                return HttpResponse(status=404)
            article = get_article(request, id)
            if request.user.id == article.author.id:
                body = request.body.decode()
                article_title = json.loads(body)['title']
                article_content = json.loads(body)['content']
                '''
                try:
                    body = request.body.decode()
                    article_title = json.loads(body)['title']
                    article_content = json.loads(body)['content']
                except (KeyError, JSONDecodeError) as e:
                    return HttpResponseBadRequest()
                '''
                article = Article.objects.get(id=id)
                article.title = article_title
                article.content = article_content
                article.save()
                response_dict = {'id': article.id, 'title': article.title, 'content': article.content, 'author': article.author.id}
                return HttpResponse(json.dumps(response_dict), status=200)
            else: 
                return HttpResponse(status=403)
        elif request.method == 'DELETE': 
            try:
                article = Article.objects.get(id=id)
            except Article.DoesNotExist:
                return HttpResponse(status=404)
            article = get_article(request, id)
            if request.user.id == article.author.id:
                article = Article.objects.get(id=id) # maybe delete this line
                article.delete() 
                return HttpResponse(status=200)
            else: 
                return HttpResponse(status=403)
        else:
            return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])
    else:
        return HttpResponse(status=401)


def comments(request, id):
    if request.user.is_authenticated:
        if request.method == 'GET':
            try:
                article = Article.objects.get(id=id)
            except Article.DoesNotExist:
                return HttpResponse(status=404)
            comments = [{"article": comment.article.id, "content": comment.content, "author": comment.author.id} for comment in Comment.objects.filter(article = get_article(request, id))]
            return JsonResponse(comments, safe=False)
        elif request.method == 'POST':
            try:
                article = Article.objects.get(id=id)
            except Article.DoesNotExist:
                return HttpResponse(status=404)
            req_data = json.loads(request.body.decode())
            article = get_article(request, id)
            content = req_data['content']
            author = request.user
            comment = Comment(article=article, content=content, author=author)
            comment.save()
            response_dict = {"id": comment.id, "article": comment.article.id, "content": comment.content, "author": comment.author.id}
            return HttpResponse(json.dumps(response_dict), status=201)
        else: 
            return HttpResponseNotAllowed(['GET', 'POST'])
    else:
        return HttpResponse(status=401)


def comment(request, id):
    if request.user.is_authenticated:
        if request.method == 'GET':
            try:
                comment = Comment.objects.get(id=id)
            except Comment.DoesNotExist:
                return HttpResponse(status=404)
            return JsonResponse({"article": comment.article.id, "content": comment.content, "author": comment.author.id}, safe=False)
        elif request.method == 'PUT':
            try:
                comment = Comment.objects.get(id=id)
            except Comment.DoesNotExist:
                return HttpResponse(status=404)
            if request.user.id == comment.author.id:
                body = request.body.decode()
                comment_content = json.loads(body)['content'] 
                '''
                try:
                    body = request.body.decode()
                    comment_content = json.loads(body)['content']
                except (KeyError, JSONDecodeError) as e:
                    return HttpResponseBadRequest()
                '''
                comment.content = comment_content
                comment.save()
                response_dict = {"id": comment.id, "article": comment.article.id, "content": comment.content, "author": comment.author.id}
                return HttpResponse(json.dumps(response_dict), status=200)
            else: 
                return HttpResponse(status=403)
        elif request.method == 'DELETE':
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
            return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])
    else:
        return HttpResponse(status=401)

def get_article(request, id):
        try:
            return Article.objects.get(id=id)
        except Article.DoesNotExist:
            return HttpResponse(status=404)

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])
