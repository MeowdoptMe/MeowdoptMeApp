# Backend part of MeowdoptMeApp

## Install

1. Make sure you have installed python3, pip and cmake.
1. Go to app with `cd /BackendApp`
1. Setup the project with:
   1. Run `make setup` - to create virtual environment for the project
   1. Run `source env/bin/activate` on Ubuntu or `env/Scripts/activate` on Windows - to open virtual environment
   1. Run `make requirements` - to install needed packages
1. Make database and migrations with `make updatedb`
1. If you want to load sample initial data for the database you can run `make prepare`
1. To run server you can use `make server`, but if you have problem `Error: That port is already in use.` you can use `make porterror`

## Formatting

If you want to format with black, run `make format`

## Testing

### Running tests

If you want to test, make sure you have activated virtual environment (env) and your django server isn't running.
Commands to run tests:

- django unit tests with `make test`
- linting with `make lint`
- formatting check with `make check-formatting`

### Writing tests

Tests for every django app are located in `<app_dir>/tests.py`

## Troubleshooting with migrations

If you get OperationalError `no such table`, you can do:
1. delete file `db.sqlite3`
1. delete from all django apps directory `migrations`
1. run `make updatedb`
