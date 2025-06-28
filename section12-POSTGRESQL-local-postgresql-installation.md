## What is PostgreSQL

- Installing postgreSQL installs pgadmin.
- Pgadmin is a web-based tool to manage and inspect a postgres database.
- One postgres server can have multiple databases.
- One app usually associated with one database.
- use Query Editor to test SQL on a specific database
- view table definition by clicking on database -> expanding schemas -> tables
  (right click on table) -> view/edit data -> all rows

## Installation

- installation https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
- during install -> uncheck stack builder
- password is password for local machine
- run pgAdmin 4 -> password is to access pgadmin
- clicking on servers -> requested password is password for localmachine.
- have to refresh table to see updated info.

---

## Restoring a database

#### restoring database from a backup

sql databases backup to a .sql file.

restore from backup:
pgadmin -> servers-> localhost -> databases -> instagram -> _(right click) -> restore
filename -> ... -> _(format -> all files or .sql) -> \*(select file to restore from)

might have to set the 'PostgreSQL Binary Path':
In pgAdmin select File -> Preferences and look for Path and then click on Binary Path and it needs your path where it says PostgreSQL Binary Path. Go to your computer -> C: (on windows) -> Program Files -> PostgreSQL -> your version -> bin

restore options tab -> enable: 1. types of objects -> only data -> yes 2. do not save -> owner -> yes 3. queries -> single transaction -> yes 4. disable -> trigger -> yes 5. miscelleaneous / behavior -> verbose messages -> yes

#### restore database from scratch

steps to restore:

1. close all query tools windows
2. stop all server activity except the first under pgadmin -> dashboard
3. drop the database
4. create new database
5. restore from backup (same step as above) BUT restore options tab -> enable ONLY 4 steps from above

restore from backup:
pgadmin -> servers-> localhost -> databases -> instagram -> _(right click) -> restore
filename -> ... -> _(format -> all files or .sql) -> \*(select file to restore from)

1. types of objects -> only data -> NO

2. do not save -> owner -> yes
3. queries -> single transaction -> yes
4. disable -> trigger -> yes
5. miscelleaneous / behavior -> verbose messages -> yes

---
