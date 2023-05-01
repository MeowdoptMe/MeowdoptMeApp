## shelterRelated
- GET /shelters - lista schronisk
- GET /shelters/id - zawartość schroniska o numerze id
- GET /shelters/id/associates - lista wszytskich osób powiązanych z danym schroniskiem
- GET /shelters/id/associates/permissions - lista wszystkich permicji dla użytkowników
- GET /shelters/id/permission_requests - lista oczekujących permission requestów
- GET /shelters/id/contact_info - daje info o danych kontaktowych
- POST /shelters/id/add_contact_info - dodanie info kontaktowego do schroniska
- POST /shelters/id/edit_contact_info - edycja tylko danych kontaktowych
- DELETE /shelters/id/remove_contact_info - usunięcie danych kontaktowych schroniska
- POST /shelters/id/add - dodanie nowego schroniska
- POST /shelters/id/edit - edycja danych schroniska
- DELETE /shelters/id/remove - usunięcie danego schroniska
- POST /shelters/id/edit_name - edycja tylko nazwy schroniska
- POST /shelters/id/modify_associate - edycja użytkowników mających jakieś uprawnienia do zarządzania danym schroniskiem
- POST /shelters/id/make_request - pozwala użytkownikowi zrobić permission request
- POST /shelters/id/resolve_request - pozwala uprawnionemu użytkownikowi zaakceptować permission request

## adRelated
- GET /ads - lista ogłoszeń
- GET /ads/id - zawartość ogłoszenia o numerze id
- GET /ads/id/photo_album - wszytskie zdjęcia danego ogłoszenia
- GET /ads/id/pet - daje informacje zawarte w petcharacteristics
- GET /ads/id/share_link - zwraca link do udostępnienia ogłoszenia
- POST /ads/id/set_shelter - przypisuje schronisko do ogłoszenia
- POST /ads/id/set_pet - przypisuje zwierzaka do ogłoszenia
- POST /ads/id/set_active - zmienia dostępność ogłoszenia

## userAuth
- GET /user - wyświetlenie profilu użytkownika
- POST /user/edit - edycja podstawowych danych (formularz) - od strony usera
- POST /user/id/edit - edycja danych usera (w tym przede wszystkim permissions) - od strony admina

## permissions - TODO
- GET /permissions - wyświetla permissions (tu trzeba dodać filtry djangowe)
- POST /permissions/permissions_requests/id/cancel_request - użytkownik może usunąć requesta o permission
- POST /permissions/permission_type/id/user_id/remove - usunięcie dostępu dla danego usera (removePermission)

## photoAlbum (będzie podpięty do shelterRelated i adRelated osobno - jak sie uda)
- GET /photoAlbum/id/photos - zwraca zdjęcia z danego albumu
- POST /photoAlbum/id/delete/photo_id - usuwa dane zdjecie o numerze photo_id z albumu
- POST /photoAlbum/add - dodaje nowy album
- POST /photoAlbum/id/remove - usuwa nowy album
- POST /photoAlbum/id/edit - edytuje album
- PUT /photoAlbum/id/edit/photo_id - edytuje zdjęcie o numerze photo_id (zrobi setImg i setDescription)











