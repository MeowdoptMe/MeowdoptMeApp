## testowanie z Django Rest Frameworkiem (DRF)

### przydatne funkcje, moduły, klasy

1. `reverse`/`reverse_lazy` - do generowania adresów URL na podstawie nazwy widoku. Jest to odwrócenie procesu routingu, które pozwala na dynamiczne generowanie adresów URL zamiast pisania ich ręcznie. Różnica polega na tym że `reverse_lazy` jest wywoływana tylko w momencie użycia.
2. `setUp`/`tearDown` - do przygotowania/wyczyszczenia warunków testowych
3. `status` - moduł, który zawiera zestaw stałych reprezentujących kody HTTP, które są używane do komunikacji między klientem a serwerem w kontekście API. Moduł status zapewnia czytelne nazwy symboliczne dla różnych kodów statusu HTTP, co ułatwia pracę z nimi w kodzie.
4. `Permission` - klasa bazowa używana do definiowania reguł dostępu (permissions) dla widoków API. Reguły dostępu określają, czy użytkownik ma uprawnienie do wykonywania określonych operacji, takich jak odczyt, zapis, aktualizacja lub usunięcie danych.

### - client

APIClient to klasa zachowująca się jak atrapa przeglądarki; umożliwia testowanie i interakcje z aplikacją (w podstawowym Django jest to Client, a REST rozszerza tę klasę) i używa się jej w klasach APITestCase.

#### Co można z nim zrobić:

- symulować HTTP requesty: np. GET, POST i obserwować responsy (i ich headery i status code'y)
- sprawdzić łańcuchy przekierowań (redirectów)

### Różnica pomiędzy APIClient a APIRequestFactory z DRF

APIClient jest klasą dostarczaną przez DRF i jest bardziej kompleksowym narzędziem do testowania API. Działa na poziomie wysyłania rzeczywistych żądań HTTP do widoków API i obsługuje przetwarzanie odpowiedzi HTTP.
APIClient symuluje interakcję z API tak, jakby to robił klient HTTP. Możesz używać go do wykonywania żądań GET, POST, PUT, DELETE itp. oraz do testowania uwierzytelnienia, autoryzacji, serializerów i innych funkcji DRF.
APIRequestFactory: APIRequestFactory to narzędzie, które umożliwia tworzenie obiektów HttpRequest na poziomie Pythona. Nie wysyła rzeczywistych żądań HTTP, ale pozwala na tworzenie żądań wewnątrz testów jednostkowych.
Możesz używać APIRequestFactory do tworzenia obiektów Request i przekazywania ich bezpośrednio do widoków API. Umożliwia to testowanie logiki widoku bez konieczności komunikacji przez sieć.

### - APITestCase

Zamiast używać wbudowanej w Django klasy TestCase (lub pochodnych) to korzysta się z restowego APITestCase.
Ta klasa służy do tworzenia klas, które łączą pewne testy dotyczące jednego modelu bazy danych.
Przykładowe wysłanie danych (client.post) i odczyt (.get().name):

```python
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from .models import PhotoAlbum

class PhotoAlbumTests(APITestCase):
    def setUp(self):
        self.factory = APIClient()

    def tearDown(self) -> None:
        pass

    def test_create_account(self):
        url = reverse('photo_album-list')
        data = {'name': 'test_album'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(PhotoAlbum.objects.count(), 1)
        self.assertEqual(PhotoAlbum.objects.get().name, 'test_album')
```

### - APIRequestFactory - przykład użycia

```python
from rest_framework.test import APITestCase, APIRequestFactory
from .views import PhotoAlbumList
from django.urls import reverse_lazy
from rest_framework import status

class PhotoAlbumTests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_list(self):
        url = reverse_lazy("photo_album_list")
        request = self.factory.get(url)
        view = PhotoAlbumList.as_view()
        response = view(request)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )
```

### - APIClient - przykład użycia

```python
from rest_framework.test import APITestCase, APIClient
from django.urls import reverse_lazy
from rest_framework import status

class PhotoAlbumTests(APITestCase):
    def setUp(self):
        self.factory = APIClient()

    def test_list(self):
        url = reverse_lazy("photo_album_list")
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )
```

### - testowanie z autoryzacją użytkownika

Testowanie autoryzacji w aplikacji wygląda tak, że tworzony jest na początku użytkownik z odpowiednimi dostępami w metodzie setUp np.

```python
from userAuth.models import User
from django.contrib.auth.models import Permission
from permissionHandler.models import UserPermission
from rest_framework.test import APITestCase
class PhotoAlbumTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="ewa", password="ewa12345")
        permission_create = Permission.objects.get(codename="view_photo_album")
        UserPermission.objects.create(
            user=self.user, shelter=self.shelter, permission=permission_create
        )
```

Następnie w wybranym teście w klasie testowej przed zrobieniem reverse wywołujemy metodę force_authenticate na instancji APIClient z podaniem upoważnionego usera.
Jeśli akurat ten widok wymaga dostępu, który ma użytkownik, to otrzyma on do niego dostęp.

```python
from rest_framework.test import APITestCase
from django.urls import reverse_lazy
from rest_framework import status

class PhotoAlbumTests(APITestCase):
    def test_detail(self):
        self.client.force_authenticate(user=self.user)
        url = reverse_lazy("photo_album_detail", kwargs={"pk": 1})
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
            f"Expected Response Code 200, received {response.status_code} instead.",
        )
```
