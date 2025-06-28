###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## Schema Migration

Have to be careful and plan of making changes to databases.

1. changes to database and changes to clients (api server) need to be made at precisely the same time.

2. When working with other engineers, we need a really easy way to tie the structure of our database to our code.
   ie. when they check out a version of your code, their databases has a way of being insync with this code.

### Migration files

no more changes to database directly in pgadmin, will use Schema Migration Files.
Schema migration files can be written in any language.
it has an 'UP' and 'DOWN' section.
the up upgrades the structure of our database - apply
the down downgrade and undo's the 'UP' commands - revert
every migration file has what you need to make a change, and undo a change.

Steps to migration:

1. start deploy of updates
2. new version of code on remote server, ready to start receiving traffic.
   run all available migrations - db structure updated.
3. start receiving traffic

It is suggested to write migrations manually.

### migration libraries

Javascript
npmjs.com/package/node-pg-migrate
npmjs.com/package/typeorm
npmjs.com/package/sequelize
npmjs.com/package/db-migrate

Go
github.com/golang-migrate/migrate
github.com/go-pg/migrations/
gorm.io/docs/migration.html

Python
pypi.org/project/alembic/
pypi.org/project/yoyo-migrations/

#### npmjs.com/package/node-pg-migrate

- required: node.js
- npm install node-pg-migrate pg

```js
//package.js
"scripts": {
  "migrate":"node-pg-migrate"
}
```

##### create migration file

- migration file will be added to migrations/ folder.
- creates a .js file files are named with timestamp, tells which order they should be run.

```cmd
npm run migrate create table comments
```

##### documentation example in javascript with object like syntax

```js
exports.up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    name: { type: "varchar(1000)", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.createTable("posts", {
    id: "id",
    userId: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "cascade",
    },
    body: { type: "text", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.createIndex("posts", "userId");
};
```

##### documentation example in javascript using SQL

```js
exports.shorthands = undefined;
exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE comments (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      contents VARCHAR(200) NOT NULL
    );
  `);
};

exports.down = pgm = {
  pgm.sql(`
    DROP TABLE comments;
  `);
};
```

##### view executed migrations

Schemas->public->tables->pgmigrations->view/edit data -> all rows

##### Running migration commands

set up Environment variable: DATABASE_URL
where 'socialnetwork' is the name of the database.
to run the down command, replace 'up' with 'down', which udoes the previous 'up' migration.

to this value:

```
postgres:// USERNAME : PASSWORD @localhost:5432/socialnetwork
```

###### on windows

username = postgres
password = you set this when you installed PostgreSQL

###### on mac

username = your username
password = none

Windows with Git Bash

```cmd
DATABASE_URL=postgres://USERNAME:PASSWORD@localhost:5432/socialnetwork npm run migrate up
```

Windows with CMD

```cmd
set DATABASE_URL=postgres://USERNAME:PASSWORD@localhost:5432/socialnetwork&&npm run migrate up
```

Windows with Powershell

```cmd
$env:DATABASE_URL="postgres://USERNAME:PASSWORD@localhost:5432/socialnetwork"; npm run migrate up
```

MacOS

```cmd
DATABASE_URL=postgres://USERNAME@localhost:5432/socialnetwork npm run migrate up
```

##### running a second migration file

changing the 'contents' column to 'body'
(creates a migration .js file)

```cmd
npm run migrate create rename contents to body
```

```js
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql("ALTER TABLE comments RENAME COLUMN contents TO body");
};

exports.down = (pgm) => {
  pg.sql("ALTER TABLE comments RENAME COLUMN body TO contents");
};
```

then re-run the migrate up command.

calling the down migration will revert one migration file at a time.

---
