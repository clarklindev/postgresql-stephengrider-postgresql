###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

---

# Section 3: working with tables

- schema diagrams help show relationship between tables and their records

relationships between tables

- one-to-many relationship - eg. a user has many photos, a photo has many comments
- many-to-one relationship - eg. a photo has one user, a comment has one photo
- one-to-one relationship - eg. a boat has one captain, a captain is only captain of one boat
- many-to-many relationship - eg. a student has many classes, a class has many students

A join table refers to a relationship between tables where its columns contain foreign keys to rows in other tables

##### primary keys

Uniquely identifies a row (record) in a table

- primary keys column is usually called 'id' that is an INTEGER

##### Auto-generated ID

- 'SERIAL' data type to tell Postgres that we want it to generate the values automatically (starts at 1). some other SQL languages use 'AUTOINCREMENT' keyword.

- 'PRIMARY KEY' adds special performance benefits to look up records when looking up records using the id.

```SQL
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(50)
)
```

- note we leave out the 'id' column and insert only 'username'

```SQL
INSERT INTO users (username)
VALUES ('Apple12'),('Bottom13'),('Tees14');
```

##### foreign keys

Identifies a record (usually in another table) that a row is associated with.
Sets up relationship between 2 different records

- do not have to be unique

- the "many" side gets the foreign key

- column naming convention (resource_id): foreign table_foreign column

- SQL syntax for column to reference another table

```SQL
user_id INTEGER REFERENCES table(column)
```

###### create foreign key column

```SQL
CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  url VARCHAR(200),
  user_id INTEGER REFERENCES users(id)
);
```

```SQL
INSERT INTO photos (url, user_id)
VALUES ('http://1.jpg', 4),('http://1.jpg', 1),('http://1.jpg', 2),('http://1.jpg', 4);
```

###### eg. selecting all photos associated with user of id 4

```SQL
SELECT * FROM photos WHERE user_id = 4;
```

###### constraints on insertion

3 scenarios

- insert that references an exisiting foreign id - Success
- insert that references non-existing foreign id - Error - violates foreign key constraint!
- insert that does NOT reference any foreign id with value NULL adds 'null' value to column value

###### constraints on deleting

constraints specify what happens when you try to delete a user when a photo is still referencing it.

```SQL
ON DELETE RESTRICT        /*throw an error*/
ON DELETE NO ACTION       /*throw an error*/
ON DELETE CASCADE         /*deletes all photo's associated with user too*/
ON DELETE SET NULL        /*sets 'user_id' of the photo to NULL*/
ON DELETE SET DEFAULT     /*sets 'user_id' of the photo to a default value if provided*/
```

- constraints are added on to foreign key column

```SQL
CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  url VARCHAR(200),
  user_id INTEGER REFERENCES user(id) ON DELETE CASCADE /*the delete constraint is added to foreign key column*/
);
```

---
