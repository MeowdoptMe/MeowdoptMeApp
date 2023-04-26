shelterRelated\
GET /shelters - lista schronisk\
GET /shelters/pk - zawartość schroniska o numerze pk\
GET /shelters/pk/associates - lista wszytskich osób powiązanych z danym schroniskiem\
GET /shelters/pk/associates/permissions - lista wszystkich permicji dla użytkowników\
GET /shelters/pk/permission_requests - lista oczekujących permission requestów\
GET /shelters/pk/contact_info - daje info o danych kontaktowych\
POST /shelters/pk/edit - edycja danych schroniska\
POST /shelters/pk/edit_name - edycja tylko nazwy schroniska\
POST /shelters/pk/modify_associate - edycja użytkowników mających jakieś uprawnienia do zarządzania danym schroniskiem\
POST /shelters/pk/edit_contact_info - edycja tylko danych kontaktowych\
POST /shelters/pk/make_request - pozwala użytkownikowi zrobić permission request\
POST /shelters/pk/resolve_request - pozwala uprawnionemu użytkownikowi zaakceptować permission request\

adRelated\
GET /ads - lista ogłoszeń\
GET /ads/pk - zawartość ogłoszenia o numerze pk\
GET /ads/pk/photo_album - wszytskie zdjęcia danego ogłoszenia\
GET /ads/pk/pet - daje informacje zawarte w petcharacteristics\
GET /ads/pk/share_link - zwraca link do udostępnienia ogłoszenia\
POST /ads/pk/set_shelter - przypisuje schronisko do ogłoszenia\
POST /ads/pk/set_pet - przypisuje zwierzaka do ogłoszenia\
POST /ads/pk/set_active - zmienia dostępność ogłoszenia\

userAuth\
GET /user - wyświetlenie profilu użytkownika\
POST /user/edit - edycja podstawowych danych (formularz) - od strony usera\
POST /user/pk/edit - edycja danych usera (w tym przede wszystkim permissions) - od strony admina\

permissions - TODO\
GET /permissions - wyświetla permissions (tu trzeba dodać filtry djangowe)\
POST /permissions/permissions_requests/pk/cancel_request - użytkownik może usunąć requesta o permission\
POST /permissions/permission_type/pk/user_pk/remove - usunięcie dostępu dla danego usera (removePermission)\

photoAlbum (będzie podpięty do shelterRelated i adRelated osobno - jak sie uda)\
GET /photoAlbum/pk/photos - zwraca zdjęcie z danego albumu\
POST /photoAlbum/pk/add - dodaje zdjęcie do danego albumu\
POST /photoAlbum/pk/delete/photo_pk - usuwa dane zdjecie o numerze photo_pk z albumu\
POST /photoAlbum/pk/edit/photo_pk - edytuje zdjęcie o numerze photo_pk (zrobi setImg i setDescription)\












