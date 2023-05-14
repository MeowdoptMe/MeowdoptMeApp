## shelterRelated

- GET /shelters - lista schronisk
- GET/PUT/DELETE /shelters/id - zawartość schroniska o numerze id
- POST /shelters/add - dodaje schronisko

- GET /shelters/id/permissions/ - permissions do danego schroniska
- POST /shelters/id/permissions/add - dodanie permission do danego schroniska
- GET/PUT/DELETE /shelters/id/permissions/permission_id - edycja wybranego permission do schroniska

## permissionHandler

- GET /permission-requests - zwraca wszytskie requesty
- GET/DELETE /permission-requests/id - widok pojedynczego requesta
- POST /permission-requests/make - pozwala użytkownikowi zrobić permission request 
- POST /permission-requests/resolve - pozwala uprawnionemu użytkownikowi zaakceptować permission request
- GET /permission-requests/shelters/shelter_id - zwraca wszytskie requesty do danego schroniska
- GET /permission-requests/users/user_id - zwraca wszytskie requesty, które wysłał dany użytkownik

## adRelated

- GET /ads - lista ogłoszeń
- GET/PUT/DELETE /ads/id - zawartość ogłoszenia o numerze id
- POST /ads/add - dodaje ogłoszenie
- POST /ads/id/add-pet - dodaje zwierzę do ogłoszenia
- 
## userAuth

- POST /userAuth/login - zalogowanie się usera
- POST /userAuth/register - rejestracja usera
- POST /userAuth/logout - wylogowanie się usera
- POST /userAuth/reset-password - zresetowanie hasła usera
- POST /userAuth/reset-email - przypisanie nowego maila
- POST /userAuth/token-refresh - odświeżenie tokenu

## userManage

- GET/PUT/DELETE /users/id/ - profil użytkownika
- GET /users/ - wyświetlenie listy userów (dla admina)
- POST /users/add - dodanie nowego użytkownika

## photoAlbum (będzie podpięty do shelterRelated i adRelated osobno - jak sie uda)

- GET /photo-albums - lista ogłoszeń
- GET/PUT/DELETE /photo-albums/id zwraca zdjęcia z danego albumu
- POST /photo-albums/add - dodaje nowy album
- GET /photo-albums/id/photos - zwraca zdjęcia z albumu
- GET /photo-albums/photos/photo-id - detale zdjęcia
