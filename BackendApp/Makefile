initdb:
	python3 manage.py migrate

updatedb:
	python3 manage.py makemigrations userAuth
	python3 manage.py makemigrations userManage
	python3 manage.py makemigrations shelterRelated
	python3 manage.py makemigrations permissionHandler
	python3 manage.py makemigrations adRelated
	python3 manage.py makemigrations photoAlbum
	python3 manage.py makemigrations
	python3 manage.py migrate

setup:
	python3 -m pip install --user virtualenv
	python3 -m venv env

requirements:
	python3 -m pip install -r requirements.txt

update:
	python3 -m pip install --upgrade setuptools
	python3 -m pip install --upgrade -r requirements.txt

test:
	python3 manage.py test --verbosity 2

server:
	python3 manage.py runserver

rerun-server:
	fuser -k 8000/tcp
	python3 manage.py runserver

prepare:
	python3 manage.py shell < initial_data/init.py

lint:
	python3 -m pylint --load-plugins pylint_django --django-settings-module=BackendApp.settings *.py --disable=missing-docstring --disable=C0103,C0301 userAuth BackendApp

check-formatting:
	python3 -m black --check --quiet . || python3 -m black --verbose --diff .

format:
	python3 -m black --quiet ./**/*.py
