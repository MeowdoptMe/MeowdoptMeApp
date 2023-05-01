initdb:
	python manage.py migrate

updatedb:
	python manage.py makemigrations
	python manage.py migrate

setup:
	python3 -m venv env
	source env/bin/activate
	pip install -r requirements.txt

update:
	pip install --upgrade setuptools
	pip install --upgrade -r requirements.txt

test:
	python manage.py test --verbosity 2

server:
	python manage.py runserver

porterr:
	fuser -k 8000/tcp
	python manage.py runserver