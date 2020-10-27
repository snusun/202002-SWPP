from django.test import TestCase, Client
import json

''' add trailing slash '''

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

'''
    def test_user_model(self):
        user = User.objects.get(username="test")
        self.assertEqual(user.username, "test")
        '''