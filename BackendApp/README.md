# Backend part of MeowdoptMeApp

## Install

1. Make sure you have installed python3, pip and cmake.
2. Go to app with `cd /BackendApp`
3. Run `make setup` - to create virtual environment for project
4. Run `source env/bin/activate` on Ubuntu or `env/Scripts/activate` on Windows - to open virtual environment
5. Run `make requirements` - to install needed packages
6. Make database and migrations with `make updatedb`
7. To run server you can use `make server`, but if you have problem `Error: That port is already in use.` you can use `make porterror`

## Testing

### Running tests

If you want to test, make sure you have activated virtual environment (env) and your django server isn't running.
To run tests run `make test`

### Writing tests

Tests for every django app are located in `<app_dir>/tests.py`
