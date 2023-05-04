# Backend part of MeowdoptMeApp

## Install

1. Clone repo with: `git clone https://github.com/tjzel/MeowdoptMe/BackendApp <directory>`
2. Run `make setup` - to create virtual environment for project
3. Run `source env/bin/activate` - to open virtual environment
4. Run `make requirements` - to install needed packages
5. Make database and migrations with `make updatedb`
6. To run server you can use `make server`, but if you have problem `Error: That port is already in use.` you can use `make porterror`

## Testing
### Running tests

To run tests run `make test`

### Writing tests

Tests for every django app are located in `<app_dir>/tests.py`
