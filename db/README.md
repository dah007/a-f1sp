# Create Docker MySQL database instance

## Using `docker-compose`

If you haven't created the `f1sp-db`: Navigate into the `db` directory, run `docker compose up -d` -- that should bring up the main Docker MYSQL instance.
After that, follow the <a href="#db-prep">db prep steps below</a>

Otherwise: <a href="#db-prep">db prep steps below</a>

## Create the volume

## DB Prep

<a name="db-prep"></a>

## Create the container using the latest mysql image

```shell
docker run --name f1sp-db -e MYSQL_ROOT_PASSWORD=f1spf1rankAZU! -v f1sp-data:/var/lib/mysql -d mysql:latest
```

---

## "shell" into mysql

```shell
docker exec -it f1sp-db mysql -u root -p
```

## Inside sql prompt (`sql>`)

```sql
CREATE DATABASE f1sp; USE f1sp;
```

### Create new MYSQL user

```sql
CREATE USER 'f1sp'@'%' IDENTIFIED BY 'f1sp';
```

- Check that the user was created: ```SELECT user from mysql.user;```

### Make sure the permissions are set

```sql
GRANT ALL PRIVILEGES ON *.* TO 'f1sp'@'%'; FLUSH PRIVILEGES; EXIT;

-- over kill, if need:
GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'f1sp'@'%' WITH GRANT OPTION; FLUSH PRIVILEGES;
```

### Copy the sql file into the instance

**NOTE:** MUST be done from the `db` directory

```shell
docker cp /home/dah/web-projects/f1db/build/data/sql/f1db-sql-mysql.sql f1sp-data:f1sp.sql;
```

\*\*\*NOTE: db is a dir of of the top level, so this should be run from the project root

### Seed the sql data

Log back into the MY SQL shell (`docker exec -it f1sp-db mysql -u root -p`) and run:

```sql
use f1sp; source f1sp.sql;
```

**NOTE:** This must be done from the `db` directory

## SQLite

If you want to use SQLite in place of MySQL, follow the <a href="docs/sqlite_setup.md">SQLite setup</a>.
