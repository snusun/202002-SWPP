from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import Article, Comment
import json

class BlogTestCase(TestCase):
    def setUp(self):
        User.objects.create_user(
            username="test", email="testemail", password="testpassword")

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

