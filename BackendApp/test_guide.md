## testowanie z rest frameworkiem
### - client
APIClient to klasa zachowująca się jak atrapa przeglądarki; umożliwia testowanie i interakcje z aplikacją (w podstawowym Django jest to CLient, a rest rozszerza tę klasę) i używa się jej w klasach APITestCase. 
Natomiast poza taką klasą można użyć RequestClient
#### Co można z nim zrobić:
* symulować HTTP requesty: np. GET, POST i obserwować responsy (i ich headery i status code'y)
* sprawdzić łańcuchy przekierowań (redirectów)

### - podstawowy test
Jeżeli chcemy sprawdzić, czy da się połączyć z dany adresem url (czy wyświetli HTTP request = ok)
#### - robimy request ```GET http://127.0.0.1:8000/albums```
```python
from rest_framework.test import RequestsClient
client = RequestsClient()
response = client.get('http://127.0.0.1:8000/albums')
assert response.status_code == 200
```
#### - robimy request ```POST http://127.0.0.1:8000/albums/add name=test_album```
```python
from rest_framework.test import RequestsClient
client = RequestsClient()
data = {'name': 'test_album'}
response = client.post('http://127.0.0.1:8000/albums/add', data, format='json')
assert response.status_code, 201
```
### - APITestCase
Zamiast używać wbudowanej w Django klasy TestCase (lub pochodnych) to korzysta się z restowego APITestCase. 
Ta klasa służy do tworzenia klas, które łączą pewne testy dotyczące jednego modelu bazy danych.
Przykładowe wysłanie danych (client.post) i odczyt (.get().name):
```python
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import PhotoAlbum

class PhotoAlbumTests(APITestCase):
    def test_create_account(self):
        url = reverse('photo_album-list')
        data = {'name': 'test_album'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(PhotoAlbum.objects.count(), 1)
        self.assertEqual(PhotoAlbum.objects.get().name, 'test_album')
```
### - RequestFactory
Daje możliwość zrobienia instancji requestu do testowania każdego widoku (z views.py) niezależnie
```python
from rest_framework.test import APITestCase, APIRequestFactory

from .views import PhotoAlbumViewSet

class PhotoAlbumTests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = PhotoAlbumViewSet.as_view({'get': 'list'})
        self.uri = '/albums/'

    def test_list(self):
        request = self.factory.get(self.uri)
        response = self.view(request)
        self.assertEqual(response.status_code, 200, f'Expected Response Code 200, received {response.status_code} instead.')
```

### - testowanie z autoryzacją użytkownika
* setup_user tworzy nowego użytkownika testowego
* setUp inicjuje cały test - tworzy token autoryzacyjny dla użytkownika stworzonego w setup_user
* test_list sprawdza czy powiodła się autoryzacja z użyciem tokenu użytkownika testowego

```python
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

class PhotoALbumTests(APITestCase):
    def setUp(self):
        # ...
        self.user = self.setup_user()
        self.token = Token.objects.create(user=self.user)
        self.token.save()

    @staticmethod
    def setup_user():
        user = get_user_model()
        return user.objects.create_user(
            'test',
            email='testuser@test.com',
            password='test'
        )

    def test_list(self):
        request = self.factory.get(self.uri, HTTP_AUTHORIZATION=f'Token {self.token.key}')
        request.user = self.user
        response = self.view(request)
        self.assertEqual(response.status_code, 200, f'Expected Response Code 200, received {response.status_code} instead.')
```