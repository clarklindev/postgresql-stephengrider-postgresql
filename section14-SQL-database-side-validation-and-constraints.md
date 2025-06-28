###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## Section 14 - Database-side validation and constraints

Validation should be applied both on web server code AND the database and spread in both locations.

##### Validation on webserver

- Web server allows more complex validation.
- easier to apply new validation rules
- many libraries to handle validation automatically (eg. regex validation)

##### Validation on database

- validation still applied even connecting without web server
- guaranteed validation is always applied
- can apply validation rules ONLY IF existing rows satisfy constraint (consistency)

omitting a column value assigns 'null' or uses a default if it is set.

- Row-level validation
  - NOT NULL
  - UNIQUE
  - DEFAULT

### Add constraints

#### NOT NULL

Constraints can only be added if all values in column satisfy the contraint we want to add.

1. when creating the table

```SQL
CREATE TABLE products (
id SERIAL PRIMARY KEY,
name VARCHAR(40),
price INTEGER NOT NULL
);

```

2. after the table was created

```SQL
ALTER TABLE products
ALTER COLUMN price
SET NOT NULL;
```

fixing table so we can apply contraint by

1. find all rows with values NULL then deleting the row;
2. or we can write SQL to fix each value from NULL to something else.

```SQL
-- example of fixing values by replacing NULL with a value
UPDATE products
SET price = 9999
WHERE price IS NULL;
```

#### DEFAULT values

Allow us to insert into table but ommiting columns that have default values

1. when creating the table

```SQL
CREATE TABLE products (
  id SERIAL PRIMARY KEY
  name VARCHAR(40) NOT NULL
  price INTEGER DEFAULT 9999
)
```

2. after table was created

```SQL
ALTER TABLE products
ALTER COLUMN price
SET DEFAULT 9999;
```

#### UNIQUE

Ensuring value is unique.
Cannot add constraint unless all values in column are already unique; to fix: we need to update values to be unique, or delete row.

1. When creating the table

```SQL
CREATE TABLE products (
  id SERIAL PRIMARY KEY
  name varchar(30) UNIQUE
)
```

2. after table was created
   \*(column named needs to be in parenthesis)

```SQL
ALTER TABLE products
ADD UNIQUE (name);
```

##### multi-column uniqueness

asserting uniqueness across multiple columns

```SQL
ALTER TABLE products
ADD UNIQUE (name, department);
```

#### CHECK (validation on values)

using operators (=,<,> etc) to check values.
Cannot add constraint unless all values in column already satisfy the check;
check only work on columns (no subqueries).

1. when creating the table

```SQL
CREATE TABLE products(
  id SERIAL PRIMARY KEY
  price INTEGER CHECK (price > 0)
)
```

2. after table was created

```SQL
ALTER TABLE products
ADD CHECK (price > 0);
```

##### multi-column check

constraints where columns need validation against each other.
constraint is added to bottom

eg. table orders(created_at, est_delivery)

```SQL
CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  est_delivery TIMESTAMP NOT NULL

  --the 'est_delivery' should be after 'created_at'
  CHECK (created_at < est_delivery)
)
```

### Remove a constraint

list of constraints can be found inside pgAdmin
-> schemas -> public -> tables -> (table name) -> constraints

eg. 'products_name_key' is a contraint on the products table, name column

to remove this constraint:

```SQL
ALTER TABLE products
DROP CONSTRAINT products_name_key;
```

to visually check that this updated, you have to refresh:
right-click products table -> refresh
