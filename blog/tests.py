from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import Article, Comment
import json

class BlogTestCase(TestCase):
    def test_csrf(self):
        # By default, csrf checks are disabled in test client
        # To test csrf protection we enforce csrf checks here
        client = Client(enforce_csrf_checks=True)
        response = client.post('/api/signup/', json.dumps({'username': 'chris', 'password': 'chris'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 403)  # Request without csrf token returns 403 response

        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.post('/api/signup/', json.dumps({'username': 'chris', 'password': 'chris'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)  # Pass csrf protection

        #signin
        response = client.post('/api/signin/', json.dumps({'username': 'chris', 'password': 'chris'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)

        response = client.post('/api/signin/', json.dumps({'username': 'chris', 'password': 'chris'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 403)

        #signout
        response = client.get('/api/signout/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)

        response = client.post('/api/signout/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 403)

    #check 405(Method not allowed)
    def test_method(self):
        client = Client()

        #get token
        response = client.post('/api/token/')
        self.assertEqual(response.status_code, 405)

        response = client.put('/api/token/')
        self.assertEqual(response.status_code, 405)

        response = client.delete('/api/token/')
        self.assertEqual(response.status_code, 405)

        #signup
        response = client.get('/api/signup/')
        self.assertEqual(response.status_code, 405)
        
        response = client.put('/api/signup/')
        self.assertEqual(response.status_code, 405)

        response = client.delete('/api/signup/')
        self.assertEqual(response.status_code, 405)      

        #signin
        response = client.get('/api/signin/')
        self.assertEqual(response.status_code, 405)

        response = client.put('/api/signin/')
        self.assertEqual(response.status_code, 405)

        response = client.delete('/api/signin/')
        self.assertEqual(response.status_code, 405)

        #signout
        response = client.post('/api/signout/')
        self.assertEqual(response.status_code, 405)
        
        response = client.put('/api/signout/')
        self.assertEqual(response.status_code, 405)

        response = client.delete('/api/signout/')
        self.assertEqual(response.status_code, 405)

        #singup and signin for article and comment
        response = client.post('/api/signup/', json.dumps({'username': 'testuser', 'password': 'testpassword'}), 
                                content_type='application/json')

        response = client.post('/api/signin/', json.dumps({'username': 'testuser', 'password': 'testpassword'}),
                                content_type='application/json')
        
        #articles
        response = client.put('/api/article/')
        self.assertEqual(response.status_code, 405)
        
        response = client.delete('/api/article/')
        self.assertEqual(response.status_code, 405)

        #article
        response = client.post('/api/article/1/')
        self.assertEqual(response.status_code, 405)
        
        #comments
        response = client.put('/api/article/1/comment/')
        self.assertEqual(response.status_code, 405)
        
        response = client.delete('/api/article/1/comment/')
        self.assertEqual(response.status_code, 405)

        #comment
        response = client.post('/api/comment/1/')
        self.assertEqual(response.status_code, 405)

    def test_articleAndComment(self):
        client = Client()

        response = client.post('/api/signup/', json.dumps({'username': 'test1', 'password': 'testpassword'}),
                                content_type='application/json')
        self.assertEqual(response.status_code, 201)

        response = client.post('/api/signup/', json.dumps({'username': 'test2', 'password': 'testpassword'}),
                                content_type='application/json')
        self.assertEqual(response.status_code, 201)

        response = client.post('/api/signin/', json.dumps({'username': 'test1', 'password': 'testpassword'}),
                                content_type='application/json')
        self.assertEqual(response.status_code, 204)

        #create new article
        response = client.post('/api/article/', json.dumps({'title': 'testArticle1', 'content': 'testContent1'}),
                                content_type='application/json')
        response = client.post('/api/article/', json.dumps({'title': 'testArticle2', 'content': 'testContent2'}),
                                content_type='application/json')
        response = client.post('/api/article/', json.dumps({'title': 'testArticle3', 'content': 'testContent3'}),
                                content_type='application/json')
        self.assertIn('1', response.content.decode())
        self.assertEqual(response.status_code, 201)

        #get article list
        response = client.get('/api/article/')
        article_all_list = json.loads(response.content.decode())
        self.assertEqual(len(article_all_list), 3)

        #get specified article
        response = client.get('/api/article/1/')
        article = json.loads(response.content)
        self.assertEqual(article['title'], 'testArticle1')
        
        #get wrong article
        response = client.get('/api/article/5/')
        self.assertEqual(response.status_code, 404)

        #edit specified article
        response = client.put('/api/article/1/', json.dumps({'title': 'test', 'content': 'testContent1'}),
                                content_type='application/json')
        article = json.loads(response.content)
        self.assertEqual(article['title'], 'test')
        self.assertEqual(response.status_code, 200)

        #edit wrong article
        response = client.put('/api/article/5/')
        self.assertEqual(response.status_code, 404)
        
        #delete specified article
        response = client.delete('/api/article/2/')
        self.assertEqual(response.status_code, 200)

        #delete wrong article
        response = client.delete('/api/article/5/')
        self.assertEqual(response.status_code, 404)

        #create new comment
        response = client.post('/api/article/1/comment/', json.dumps({'content': 'test1'}),
                                content_type='application/json')
        response = client.post('/api/article/1/comment/', json.dumps({'content': 'test2'}),
                                content_type='application/json')
        self.assertIn('', response.content.decode())
        self.assertEqual(response.status_code, 201)

        response = client.post('/api/article/2/comment/', json.dumps({'content': 'test1'}),
                                content_type='application/json')
        self.assertEqual(response.status_code, 404)

        #get comments of specified article
        response = client.get('/api/article/1/comment/')
        comments = json.loads(response.content.decode())
        self.assertEqual(len(comments), 2)

        #get comments of wrong article
        response = client.get('/api/article/2/comment/')
        self.assertEqual(response.status_code, 404)

        #get specified comment
        response = client.get('/api/comment/1/')
        article = json.loads(response.content)
        self.assertEqual(article['content'], 'test1')

        #get wrong comment
        response = client.get('/api/comment/5/')
        self.assertEqual(response.status_code, 404)

        #edit specified comment
        response = client.put('/api/comment/1/', json.dumps({'content': 'testContent1'}),
                                content_type='application/json')
        comment = json.loads(response.content)
        self.assertEqual(comment['content'], 'testContent1')
        self.assertEqual(response.status_code, 200)

        #edit wrong comment
        response = client.put('/api/comment/5/')
        self.assertEqual(response.status_code, 404)
        
        #delete specified comment
        response = client.delete('/api/comment/2/')
        self.assertEqual(response.status_code, 200)

        #delete wrong comment
        response = client.delete('/api/comment/5/')
        self.assertEqual(response.status_code, 404)