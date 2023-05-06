## shelterRelated

- GET /shelters - lista schronisk
- GET/PUT/DELETE /shelters/id - zawartość schroniska o numerze id
- POST /shelters/add - dodaje schronisko
- POST /shelters/id/make-request - pozwala użytkownikowi zrobić permission request
- POST /shelters/id/resolve-request - pozwala uprawnionemu użytkownikowi zaakceptować permission request

## adRelated

- GET /ads - lista ogłoszeń
- GET/PUT/DELETE /ads/id - zawartość ogłoszenia o numerze id
- POST /ads/add - dodaje ogłoszenie
- POST /ads/id/add-pet - dodaje zwierzę do ogłoszenia
- GET /ads/id/pet - zwraca zwierzę z ogłoszenia

## userAuth

- POST /userAuth/login - zalogowanie się usera
- POST /userAuth/register - rejestracja usera
- POST /userAuth/logout - wylogowanie się usera
- POST /userAuth/reset-password - zresetowanie hasła usera
- POST /userAuth/token-refresh - odświeżenie tokenu

## userManage

- GET/PUT/DELETE /users/id/ - profil użytkownika
- GET /users/ - wyświetlenie listy userów (dla admina)
- POST /users/add - dodanie nowego użytkownika

## permissions - TODO

- GET /permissions - wyświetla permissions (tu trzeba dodać filtry djangowe)
- POST /permissions/permissions-requests/id/cancel-request - użytkownik może usunąć requesta o permission
- POST /permissions/permission-type/id/user-id/remove - usunięcie dostępu dla danego usera (removePermission)

## photoAlbum (będzie podpięty do shelterRelated i adRelated osobno - jak sie uda)

- GET /photo-albums - lista ogłoszeń
- GET/PUT/DELETE /photo-albums/id zwraca zdjęcia z danego albumu
- POST /photo-albums/add - dodaje nowy album
- GET /photo-albums/id/photos - zwraca zdjęcia z albumu
- GET /photo-albums/photos/photo-id - detale zdjęcia
