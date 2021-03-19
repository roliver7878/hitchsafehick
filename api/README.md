create virtual environment ``pipenv install``

activate env: `pipenv shell`

create database and set in variable with credentials inside `config.py`

Start migration with:

`flask init` - Connect and prepare to create tables inside database

`flask migrate` - Map ORM models/tables to generate SQL Query.

`flask upgrade` - Run query to execute in database


run server with:

`python wsgi.py`


# Using docker:
`docker build -t hitch-api`

## Run:
`docker run hitch-api`