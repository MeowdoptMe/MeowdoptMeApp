## shelterRelated

- GET /shelters - lista schronisk
- GET/PUT/DELETE /shelters/id - zawartość schroniska o numerze id
- POST /shelters/add - dodaje schronisko

- GET /shelters/id/permissions/ - permissions do danego schroniska
- POST /shelters/id/permissions/add - dodanie permission do danego schroniska
- GET/PUT/DELETE /shelters/id/permissions/permission_id - edycja wybranego permission do schroniska

## permissionHandler

- GET /permission-requests - zwraca wszystkie requesty
- GET/DELETE /permission-requests/id - widok pojedynczego requesta
- POST /permission-requests/make - pozwala użytkownikowi zrobić permission request
- POST /permission-requests/resolve - pozwala uprawnionemu użytkownikowi zaakceptować permission request
- POST /permission-requests/reject - pozwala uprawnionemu użytkownikowi odrzucić permission request
- GET /permission-requests/shelters/shelter_id - zwraca wszystkie requesty do danego schroniska
- GET /permission-requests/users/user_id - zwraca wszystkie requesty, które wysłał dany użytkownik

## adRelated

- GET /ads - lista ogłoszeń
- GET/PUT/DELETE /ads/id - zawartość ogłoszenia o numerze id
- POST /ads/add - dodaje ogłoszenie
- POST /ads/id/add-pet - dodaje zwierzę do ogłoszenia
- GET/PUT/DELETE /ads/id/pet - zwracanie/edycja zwierzęcia z ogłoszenia

## userAuth

- POST /user-auth/login - zalogowanie się usera
- POST /user-auth/register - rejestracja usera
- POST /user-auth/logout - wylogowanie się usera
- POST /user-auth/change-password - zresetowanie hasła usera
- POST /user-auth/change-email - przypisanie nowego maila
- POST /user-auth/token-refresh - odświeżenie tokenu
- POST /user-auth/request-password-reset/ - wysłanie maila z linkiem resetującym hasło
- GET /user-auth/password-reset/{uidb64}/{token}/ - link resetujący hasło
- PATCH /user-auth/password-reset-complete/ - zatwierdzenie po linku resetującym

## userManage

- GET/PUT/DELETE /users/id/ - profil użytkownika
- GET /users/ - wyświetlenie listy userów (dla admina)

## photoAlbum (będzie podpięty do shelterRelated i adRelated osobno - jak się uda)

- GET /photo-albums - lista ogłoszeń
- GET/PUT/DELETE /photo-albums/id zwraca zdjęcia z danego albumu
- POST /photo-albums/add - dodaje nowy album
- GET /photo-albums/id/photos - zwraca zdjęcia z albumu
- GET /photo-albums/id/photos/photo_id - detale zdjęcia
- GET /photo-albums/id/photos/add - dodanie zdjęcia
