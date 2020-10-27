from django.test import TestCase, Client
from django.contrib.auth.models import User
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
        response = client.post('/api/signout/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 403)


    def test_user(self):
        content = User.objects.get(username="test").__str__()
        self.assertEqual(content, "test")
