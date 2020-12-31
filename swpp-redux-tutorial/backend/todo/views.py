from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt

import json

from .models import Todo

@csrf_exempt
def index(request, id=None):
    if request.method == 'GET':
        if id is None:
            # get all
            todo_all_list = list(Todo.objects.all().values())
            return JsonResponse(todo_all_list, safe=False)
        else:
            try:
                todo = Todo.objects.get(id=id)
                response_dict = {
                        'id': todo.id,
                        'title': todo.title,
                        'content': todo.content,
                        'done': todo.done,
                        }
                return JsonResponse(response_dict, safe=False)
            except KeyError as e:
                return HttpResponseBadRequest('TodoID does not exist: {}'.format(id))
    if request.method == 'POST':
        try:
            body = request.body.decode()
            title = json.loads(body)['title']
            content = json.loads(body)['content']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        todo = Todo(title=title, content=content, done=False)
        todo.save()
        response_dict = {
            'id': todo.id,
            'title': todo.title,
            'content': todo.content,
            'done': todo.done,
        }
        return HttpResponse(json.dumps(response_dict), status=201)
    elif request.method == 'DELETE':
        if id is None:
            return HttpResponseBadRequest('TodoID is not specified.')
        try:
            todo = Todo.objects.get(id=id)
            todo.delete()
        except KeyError as e:
            return HttpResponseBadRequest('TodoID does not exist: {}'.format(id))
        return HttpResponse(status=204)
    elif request.method == 'PUT':
        if id is None:
            return HttpResponseBadRequest('TodoID is not specified.')
        try:
            todo = Todo.objects.get(id=id)
            todo.done = not todo.done
            todo.save()
            return HttpResponse(status=204)
        except KeyError as e:
            return HttpResponseBadRequest('TodoID does not exist: {}'.format(id))
    else:
        return HttpResponseNotAllowed(['GET', 'POST', 'DELETE', 'PUT'])
