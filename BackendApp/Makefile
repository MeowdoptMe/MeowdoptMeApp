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
	python manage.py shell < initial_data.py

check-formatting:
	python3 -m black --check --quiet || python3 -m black --verbose --diff .

format:
	python3 -m black --quiet .

