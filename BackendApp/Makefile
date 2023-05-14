initdb:
	python manage.py migrate

updatedb:
	python manage.py makemigrations
	python manage.py migrate

setup:
	python3 -m pip install --user virtualenv
	python3 -m venv env

requirements:
	pip install -r requirements.txt

update:
	pip install --upgrade setuptools
	pip install --upgrade -r requirements.txt

test:
	python manage.py test --verbosity 2

server:
	python manage.py runserver

rerun-server:
	fuser -k 8000/tcp
	python manage.py runserver

prepare:
	python manage.py shell < initial_data/initial_data.py

lint:
	python3 -m pylint --load-plugins pylint_django --django-settings-module=BackendApp.settings *.py --disable=missing-docstring --disable=C0103 userAuth BackendApp 

check-formatting:
	python3 -m black --check --quiet . || python3 -m black --verbose --diff .

format:
	python3 -m black --quiet ./**/*.py ./**/*.json
