# NOTES: SQL + PostgreSQL

## Source
* Stephen Grider - SQL and PostgreSQL The complete developers guide 
completion date: 2021-10-16

## skills gained?
* SQL 
* create node client with APIs that manipulate the database with CRUD

---
## Table of contents
[1. Basics](#1-basics)
  + [create / delete table](#create-table-delete-table)
  + [read](#read)
  + [add](#add)
  + [update](#update)
  + [delete](#delete)
  
  * [String operators and functions](#string-operators-and-functions)
  * [Filter records](#filter-records)
    + [Order of SQL commands](#order-of-sql-commands)
    + [where](#where)
    + [Comparison Math operators](#comparison-math-operators)
    + [Compound WHERE](#compound-where)

[2. Data Types](#2-data-types)
  + [most used types:](#most-used)
    + [Numbers](#numbers)
    + [Character](#character)
    + [Boolean](#boolean)
    + [Date](#date)
    + [Time](#time)
    + [Interval](#interval)
  + [other](#other)

[3. Tables](#3-tables)
+ [Primary keys](#primary-keys)
+ [Auto-generated ID](#auto-generated-id)
+ [Foreign keys](#foreign-keys)
  + [create foreign key column](#create-foreign-key-column)
  + [constraints on insertion](#constraints-on-insertion)
  + [constraints on deleting](#constraints-on-deleting)


[4. Joins](#4-joins)
  + [types of joins](#types-of-joins)
    + [inner join (JOIN)](#inner-join-join)
    + [left outer join (LEFT JOIN)](#left-outer-join-left-join)
    + [right outer join (RIGHT JOIN)](#right-outer-join-right-join)
    + [full join (FULL JOIN)](#full-join-full-join)

[5. Aggregation](#5-aggregation)
  + [Aggregates](#aggregates)
  + [Grouping (GROUP BY)](#grouping-group-by)
  + [GROUP BY and Aggregates combined](#group-by-and-aggregates-combined)
  + [Filtering GROUP BY with HAVING](#filtering-group-by-with-having)

[6. Sorting (ORDER BY)](#6-sorting-order-by)
  + [multi sort criteria](#multi-sort-criteria)
  + [LIMIT and OFFSET](#limit-and-offset)

[7. Unions, Intersect, Except](#7-union-union-all-intersect-intersect-all-except-except-all)
  + [Union](#union)
  + [Intersect](#intersect)
  + [Except](#except)

[8. Subqueries](#8-subqueries)
  + [Subqueries in SELECT](#subqueries-in-select)
  + [Subqueries in FROM](#subqueries-in-from)
  + [Subqueries in JOIN](#subqueries-in-join)
  + [Subqueries in WHERE](#subqueries-in-where)
    + [ALL operator](#all-operator)
    + [SOME / ANY operator](#some-any-operator)
  + [Correlated Subqueries](#correlated-subqueries)
  + [Select without a FROM](#select-without-a-from)
  
[9. Destinct](#9-destinct)

[10. Utility Operators, Keywords, and Functions](#10-utility-operators-keywords-and-functions)
  + [GREATEST](#greatest)
  + [LEAST](#least)
  + [CASE](#case)

[11. Database validation and constraints](#11-database-validation-and-constraints)
  + [add constraints](#add-constraints)
    + [NOT NULL](#not-null)
    + [DEFAULT](#default-values)
    + [UNIQUE](#unique)
      + [multi-column uniqueness](#multi-column-uniqueness)
    + [CHECK (validation on values)](#check-validation-on-values)
      + [multi-column check](#multi-column-check)
  + [remove a constraint](#remove-a-constraint)


---
[12. PostgreSQL](#12-postgresql)
  + [Installation](#installation)


---
###### <div style="text-align:right">[table of contents](#table-of-contents)</div>
## 1. Basics

* SQL is a language used to communicate with a database (eg. oracle, MS SQL server, Mysql, Postgres).
* Keywords are always capital letters
* identifiers are always lowercase.
* [pg-sql.com](http://pg-sql.com) is a web interface that can test SQL statements

#### Create table / delete table

###### create
```SQL
CREATE TABLE _ ();
```
```SQL  
CREATE TABLE cities ( 
  name VARCHAR(50),
  country VARCHAR(50),
  population INTEGER,
  area INTEGER
);
```
###### delete
```SQL
DROP TABLE _;
```
```SQL
DROP TABLE cities;
```
---
#### Read
```SQL
SELECT _ FROM _;
```

###### eg: select all from table
```SQL 
SELECT * FROM cities;
```

###### eg: select name, country from table
```SQL
SELECT name, country FROM cities;
```

###### eg: calculated columns
```SQL
SELECT name, population / area AS population_density
FROM cities;
```

---
#### Add 
```SQL
INSERT INTO _ () VALUES ();
```
###### eg. when adding items into cities the 'INSERT' column names and 'VALUES' need to match-up

```SQL
INSERT INTO cities (name, country, population, area)
VALUES 
('Tokyo', 'Japan', 3556566, 9333),
('Delhi', 'India', 24434534, 2323);
```

---
#### Update
```SQL
UPDATE _ SET _ WHERE _;
```

###### eg.
```SQL
UPDATE cities 
SET population = 1294934
WHERE name = 'New York';
```

---
#### Delete
```SQL
DELETE FROM _ WHERE _;
```
###### eg.
```SQL
DELETE FROM cities WHERE id = 300;
```


---

#### String operators and functions 

##### || or CONCAT()
###### eg. joins 2 strings - join 'name' and 'country' separate with ', '
```SQL
SELECT name || ', ' || country AS location FROM cities;
```
```SQL
SELECT CONCAT(name, ', ', country) AS location FROM cities;
```

##### LOWER()
###### eg. gives a lower case string
```SQL
SELECT 
LOWER(CONCAT(name, ', ', country)) AS location 
FROM cities;
```
##### UPPER()
###### eg. gives an upper case string
```SQL
SELECT 
UPPER(CONCAT(name, ', ', country)) AS location 
FROM cities;
```
##### LENGTH() 
###### eg. gives number of characters in a string

---

#### Filter Records

##### Order of SQL commands

1. SELECT     - table to use
2. FROM       - specifies starting set of rows to work with
3. JOIN       - Merges in data from additional tables
4. WHERE      - filters the set of rows
5. GROUP BY   - groups rows by a unique set of values
6. HAVING     - filters the set of groups

##### WHERE
* To make things easier to understand and read, think of SQL statements by reading it in this order: 
1. FROM table
2. filter with WHERE 
3. select COLUMN(S)

FROM cities, WHERE area > 4000, SELECT name

```SQL
SELECT name FROM cities WHERE area > 4000;
```

##### Comparison Math operators
* SQL order of execution is mathematical statements before comparisons 
* eg. WHERE population / area > 5000; will first calculate population/area then compare > 5000;

```
=           are values equal?
>           is value on left greater?
>=          is value on left greater or equal to?
<           is value on left less?
<=          is value on left lesser or equal to?
<> or !=    are values not equal?
BETWEEN     is value between 2 other values?
IN ()       is value present in a list?
NOT IN ()   is value not present in a list?
```

##### Compound WHERE 

######eg. by using AND
```SQL
SELECT name, area
FROM cities
WHERE
area BETWEEN 2000 AND 4000;
```

```SQL
SELECT name, area
FROM cities
WHERE
area NOT IN (3043,8900) AND name = 'Delhi';
```

######eg. by using OR
```SQL
SELECT name, area
FROM cities
WHERE
area NOT IN (3043,8900) OR name = 'Delhi' OR name = 'Tokyo';
```

---
###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## 2. Data types
#### most used:
##### Numbers
  * Numbers without any decimal points: (smallint, integer, bigint)
  * No decimal point, auto increment: (smallserial, serial, bigserial)
  * Number with decimal points: (decimal, numeric, real, double precision, float)

  (RULES):
  * SERIAL - id column on any table
  * INTEGER - store number without decimal
  * NUMERIC - store number with decimal - data needs to be accurate (bank balance, scientific calculations)
  * DOUBLE PRECISION - store number with decimal - data doesnt need to be accurate (floating point math - eg. calculations result in something like 1.001358e-05)

##### Character
No performance benefits between types

  * CHAR(4) - store some characters, length will always be 4 even if postgres has to add spaces
  * VARCHAR(40) - store a string up to 40 chars, automatically remove extra chars
  * VARCHAR - store any length of string
  * TEXT - Store any lenght of string

##### Boolean
  * TRUE ('true', 'yes', 'on', 1, 't', 'y')
  * FALSE ('false', 'no', 'off', 0, 'f', 'n')
  * NULL (null)

##### Date
Can provide string in almost any format and postgres will do conversion
can specify something to be date by explicitly giving a data type with '::DATE'

```SQL
SELECT('NOV 20 1980'::DATE);
```
  * 1980-11-20 -> 1980-11-20
  * NOV-20-1980 -> 1980-11-20
  * 20-Nov-1980 -> 1980-11-20
  * 1980-November-20 -> 1980-11-20
  * November 20, 1980 -> 1980-11-20

##### Time

  * TIME or TIME WITHOUT TIME ZONE
  * TIME WITH TIME ZONE (converts to UCT time)
  * TIMESTAMP WITH TIME ZONE
  
```SQL
  SELECT('01:23 AM'::TIME)
  --13:23:00

  SELECT('01:23 AM EST'::TIME WITH TIME ZONE)
  --converted to 01:23-05:00 (the -05 means 5 hours behind UCT time)

  SELECT('Nov-20-1980 05:23PM PST'::TIMESTAMP WITH TIME ZONE)
  --converted to 1980-11-20 02:23:00-07 (date, time, UCT offset)

```

##### Interval
Can do math calculations on intervals.
Can mix INTERVAL with other TIME types.
Think of interval as a duration of time
  * 1 day
  * 1 D
  * 1 D 1 M 1 S


```SQL
SELECT ('1 D 20 H 30 M 45 S'::INTERVAL) - ('1 D'::INTERVAL)
  --result is 20:30:45
```


#### other: 
* Currency
* arrays
* geometric
* range
* xml
* binary
* json
* UUID

---
###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## 3. Tables
* schema diagrams help show relationship between tables and their records 

relationships between tables 
* one-to-many relationship - eg. a user has many photos, a photo has many comments
* many-to-one relationship - eg. a photo has one user, a comment has one photo
* one-to-one relationship - eg. a boat has one captain, a captain is only captain of one boat
* many-to-many relationship - eg. a student has many classes, a class has many students

A join table refers to a relationship between tables where its columns contain foreign keys to rows in other tables

##### primary keys
Uniquely identifies a row (record) in a table

* primary keys column is usually called 'id' that is an INTEGER

##### Auto-generated ID

* 'SERIAL' data type to tell Postgres that we want it to generate the values automatically (starts at 1). some other SQL languages use 'AUTOINCREMENT' keyword.

* 'PRIMARY KEY' adds special performance benefits to look up records when looking up records using the id.

```SQL
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) 
)
```
* note we leave out the 'id' column and insert only 'username'
```SQL
INSERT INTO users (username)
VALUES ('Apple12'),('Bottom13'),('Tees14');
```

##### foreign keys
Identifies a record (usually in another table) that a row is associated with.
Sets up relationship between 2 different records

* do not have to be unique

* the "many" side gets the foreign key

* column naming convention (resource_id): foreign table_foreign column

* SQL syntax for column to reference another table 
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
* insert that references an exisiting foreign id - Success
* insert that references non-existing foreign id - Error - violates foreign key constraint!
* insert that does NOT reference any foreign id with value NULL adds 'null' value to column value
   
###### constraints on deleting
constraints specify what happens when you try to delete a user when a photo is still referencing it.
```SQL
ON DELETE RESTRICT        /*throw an error*/
ON DELETE NO ACTION       /*throw an error*/
ON DELETE CASCADE         /*deletes all photo's associated with user too*/
ON DELETE SET NULL        /*sets 'user_id' of the photo to NULL*/
ON DELETE SET DEFAULT     /*sets 'user_id' of the photo to a default value if provided*/
```
* constraints are added on to foreign key column 
```SQL
CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  url VARCHAR(200),
  user_id INTEGER REFERENCES user(id) ON DELETE CASCADE /*the delete constraint is added to foreign key column*/
);
```
---
###### <div style="text-align:right">[table of contents](#table-of-contents)</div>
## 4. Joins
* Produces values by <b>merging together rows</b> from different <b>related</b> tables.
* Joins are used to find data from multiple sources.

'FROM' selects all columns from that table and joins on another table, 
'ON' is criteria to match the columns; 
'SELECT' assumes the tables are 'joined' and we can pick out the columns wanted from the 'JOIN'.

* When tables have same column names, specify where data is coming from by using 'tablename.' to specify ownership
* 'AS' keyword can be used to rename the selected column name


###### basic join
```SQL
SELECT contents, username
FROM comments
JOIN users ON users.id = commments.user_id;
```
###### renaming a column with 'AS'
```SQL
SELECT comments.id AS comment_id, photo.id
FROM photos
JOIN comments ON photos.id = comments.photo_id;
```
###### using a renamed column
```SQL
SELECT comments.id, p.id
FROM photos AS p
JOIN comments on p.id = comments.photo_id;
```

##### Types of joins
1. inner join (JOIN)
2. left outer join (LEFT JOIN)
3. right outer join (RIGHT JOIN)
4. full join (FULL JOIN)

Using the following tables:

##### photos
| id | url| user_id |
| --- | --- | --- |
| 1 | http://www.a.com/ | 2 |
| 2 | http://www.b.com/ | 1 |
| 3 | http://www.c.com/ | 3 |
| 4 | http://www.d.com/ | NULL |

##### users
| id | username |
| --- | --- | 
|1|Apple.A |
|2|Boat.B |
|3|Cat.C |
|4|Dog.D |

#### inner join (JOIN)
if any match is not met in the foreign key, it is omited. 
if content is not used, it is omitted. 
this is the default join.

```SQL
SELECT url, username
FROM photos
JOIN users ON users.id = photos.user_id;
```
results from join:
* photos table has NULL foreign key for id: 4 (omitted)
* users table id: 4 is not used (omitted)

| id | url| user_id | id | username
| --- | --- | --- | --- | --- |
| 1 | http://www.a.com/ | 2 | 2 | Boat.B |
| 2 | http://www.b.com/ | 1 | 1 | Apple.A |
| 3 | http://www.c.com/ | 3 | 3 | Cat.C | 

#### left outer join (LEFT JOIN)
all content in FROM table is kept. 
if it does not find link to a foreign key, NULL values are used in joined table.
if content from joined in table is not used, it is omitted.

```SQL
SELECT url, username
FROM photos
LEFT JOIN users ON users.id = photos.user_id;
```

results from join:
* NULL is filled in for missing foreign key linked table values
* users table id: 4 is not used (omitted)

| id | url| user_id | id | username
| --- | --- | --- | --- | --- |
| 1 | http://www.a.com/ | 2 | 2 | Boat.B |
| 2 | http://www.b.com/ | 1 | 1 | Apple.A |
| 3 | http://www.c.com/ | 3 | 3 | Cat.C | 
| 4 | http://www.d.com/ | NULL | NULL | NULL


#### right outer join (RIGHT JOIN)
all content from joined-in table is used;
if it is not linked with foreign key in 'FROM' table, NULL values will then be used.
content from 'FROM' table is ommited if it cant be linked via foreign key. 
```SQL
SELECT url, username
FROM photos
RIGHT JOIN users ON users.id = photos.user_id;
```
results from join:
* rows in 'FROM' table without links to foreign keys is (omitted)

| id | url| user_id | id | username
| --- | --- | --- | --- | --- |
| 1 | http://www.a.com/ | 2 | 2 | Boat.B |
| 2 | http://www.b.com/ | 1 | 1 | Apple.A |
| 3 | http://www.c.com/ | 3 | 3 | Cat.C | 
| NULL | NULL | NULL | 4 | Dog.D

#### full join (FULL JOIN)
All content from both tables will be used.
NULL values are filled in.
```SQL
SELECT url, username
FROM photos
FULL JOIN users ON users.id = photos.user_id;
```
| id | url| user_id | id | username
| --- | --- | --- | --- | --- |
| 1 | http://www.a.com/ | 2 | 2 | Boat.B |
| 2 | http://www.b.com/ | 1 | 1 | Apple.A |
| 3 | http://www.c.com/ | 3 | 3 | Cat.C | 
| 4 | http://www.d.com/ | NULL | NULL | NULL
| NULL | NULL | NULL | 4 | Dog.D

#### Variations on joins using 'WHERE' to filter results
```SQL
SELECT url, contents
FROM comments
JOIN photos ON photos.id = comments.photo_id
WHERE comments.user_id = photos.user_id;
```

#### 3-way join (Ménage à trois)
merging together 3 different tables

* key is that on the second join, there is a more complicated merging expression.

* we are looking for common users.id in both comments.user_id and photos.user_id 
```SQL
SELECT url, contents, username
FROM comments
JOIN photos ON comments.photo_id = photos.id
JOIN users ON users.id = comments.user_id AND users.id = photos.user_id;
```

---
###### <div style="text-align:right">[table of contents](#table-of-contents)</div>
## 5. Aggregation
The formation of a number of things into a cluster.
2 ways we can group data:

### Aggregates 
Looks at many rows and calculates a <b>single</b> value.
Keywords used mostly are: 'most', 'average', 'least'.
* cannot use a SELECT on aggregate function AND select a normal column at the same time.

```SQL
COUNT()     --Returns the number of values in a group of values, NULL values are not counted
SUM()       --Finds the sum of a group of numbers  
AVG()       --Finds the average of a group of numbers
MIN()       --Returns the minimum value from a group of numbers
MAX()       --Returns the maximum value from a group of numbers
```

```SQL
SELECT MAX(id) from comments;

SELECT AVG(id) from comments;

SELECT COUNT(id) from comments;

SELECT SUM(id) from comments;
```

##### COUNT()
When using count, it does not count NULL values when selecting a column.
use COUNT(*) to not look at a specfic column but count number of rows of a table (includes NULLs)

```SQL
SELECT count(*) FROM photos;
```

### Grouping (GROUP BY)
  * SQL syntax: 'GROUP BY' 
  * reduces many rows down to <b>fewer rows</b>
  * postgres create an "imaginary group column", and rows are grouped under a respective group
  * NB: you <b>can only use SELECT on whats defined in the GROUP BY</b> (not the normal column from table) when using GROUP BY.
  * can also select normal table columns by using <b>an aggregate function</b>.


###### Eg.
Find the set of all unique user_ids.
Take each row and assign it to a group based on its user_id.
Note: SELECT here can only select 'user_id' which is what is defined in GROUP BY

```SQL
SELECT user_id
FROM comments
GROUP BY user_id;
```

### GROUP BY and Aggregates combined
An aggregate function while doing a GROUP BY will only apply to each of the individual subgroups from the GROUP BY.

eg. COUNT(id) will only apply to all individual rows inside a group eg. Group 1 (if we grouping by id).
```SQL
SELECT user_id, COUNT(id) AS number_comments_created
FROM comments
GROUP BY user_id;
```

### Filtering GROUP BY with HAVING
Difference between WHERE and HAVING is that WHERE filters out rows, and having filters out groups.

###### eg. find the number of comments for each photo where the photo_id is less than 3 and the photo has more than 2 comments.
```SQL
SELECT photo_id, COUNT(*)
FROM comments
WHERE photo_id < 3        --filter out rows
GROUP BY photo_id
HAVING COUNT(*) > 2;      --filter out groups
```

###### eg. find the users(user_ids) where the user has commented on the first 50 photos and the user added more than or equal 20 comments on those photos
```SQL
SELECT user_id, COUNT(*)
FROM comments
WHERE photo_id < 50
GROUP BY user_id
HAVING COUNT(*) > 20;
```

###### eg.given a table of 'phones', print the names of 'manufacturers' and total revenue(price * units_sold) for all phones. only print the manufacturers who have revenue greater than 2000000 for all the phones they sold.
```SQL
SELECT manufacturer, SUM(price * units_sold) 
FROM phones
GROUP BY manufacturer
HAVING SUM(price * units_sold) > 2000000 
```
###### eg. write a query to print the number of paid and unpaid orders
```SQL
SELECT paid, COUNT(*)
FROM orders
GROUP BY paid;
```

---
###### <div style="text-align:right">[table of contents](#table-of-contents)</div>
## 6. Sorting (ORDER BY) 

Reordering records based on some value.
SQL syntax: 'ORDER BY'.

SQL syntax: 
'ASC' for ascending order <b>(default)</b>.
'DESC' for descending order.

```SQL
SELECT *
FROM products
ORDER BY price;
```

#### Variations of sorting

##### multi sort criteria
when more than one record has same value, you can add additional values for sorting criteria by using a comma separated list of columns to sort by.
```SQL
SELECT *
FROM products
ORDER BY price, weight;
```
##### LIMIT and OFFSET
Typical realworld usage would be a pagination component.

LIMIT -- limit the rows returned in the result set
OFFSET -- used when you want to skip a number of rows in the result set.

in SQL statements when using both LIMIT and OFFSET, the convention is that LIMIT comes before OFFSET.

```SQL
SELECT * 
FROM products
ORDER BY price DESC
LIMIT 5
OFFSET 1;
```

###### eg. select from 'phones' that shows the names of only the second and third most expensive phones
```SQL
SELECT name
FROM phones
SORT BY PRICE DESC
LIMIT 2
OFFSET 1;
```

---

###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## 7. UNION / UNION ALL / INTERSECT / INTERSECT ALL / EXCEPT / EXCEPT ALL

```SQL
UNION           --join together the results of two queries. remove duplicate rows
UNION ALL       --join together results of two queries
INTERSECT       --Find the rows common in the results of two queries. remove duplicates
INTERSECT ALL   --Find the rows common in the results of two queries.
EXCEPT          --Find the rows that are present in the first query but not second query. remove duplicates
EXCEPT ALL      --Find the rows that are present in the first query but not second query. 
```
SQL syntax: 'UNION', 'UNION ALL', 'INTERSECT', 'INTERSECT ALL', 'EXCEPT', 'EXCEPT ALL'

#### Union
Combining results of separate queries.
If an identical row is present in both tables, only one is added to the UNION.
UNION ALL does not remove duplicates.
Wrap SQL with () to avoid ambiguity.
Only allowed to use UNION between 2 queries where the results have the same columns and column type.
Order of SQL does not matter between queries.
###### eg. UNION
```SQL
(
  SELECT *
  FROM products
  ORDER BY price DESC
  LIMIT 4
)
UNION
(
  SELECT *
  FROM products
  ORDER BY price / weight DESC
  LIMIT 4
);
```

#### Intersect
INTERSECT     - find duplicates (shows only one of duplicate)
INTERSECT ALL - finds duplicates and shows all of the duplicates
Order of SQL does not matter between queries.

#### Except
Tries to find instances of items in LEFT table that are also in RIGHT table and 
Removes them from the LEFT if they exist.
The result set is the LEFT table with its remaining items after removal of items that are in RIGHT table. 
Order of SQL matters between queries.

```SQL
(
SELECT id, name
FROM products
ORDER BY price DESC
LIMIT 4
)
EXCEPT
(
SELECT id, name
FROM products
ORDER BY price / weight DESC
LIMIT 4
);
```
---
###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## 8. Subqueries
Subqueries allow you to simplify SQL queries by breaking up a query into smaller parts.
Basically subqueries allow merging of multiple queries together.
Subqueries can appear at different locations in a SQL query statement (eg. SELECT, FROM, JOIN, WHERE etc)

```SQL
SELECT name, price
FROM products
WHERE price > 

(
  SELECT MAX(price) FROM products WHERE department = 'Toys'
);

```
#### Shape of data returned from SQL query

##### different configurations of returned items from a SELECT
* many rows, many columns
```SQL
--many rows, many columns
SELECT * FROM orders;
```

* many rows, one column
```SQL
--many rows, one column
SELECT id FROM orders;
```

* one row, one column (single value AKA Scalar Query)
```SQL
---one row, one column (single value AKA Scalar Query) 
SELECT COUNT(*) FROM orders;
```


#### Subqueries in SELECT
* subquery must <b>return a single value</b>

###### Eg. useless example - returns third column with same value for all items
```SQL
SELECT name, price, (SELECT MAX(price) FROM products) AS max_price
FROM products 
WHERE price > 868;
```

#### Subqueries in FROM
Subquery in 'FROM' is more flexible can return a wide varierty of data, outer query just needs to be <b>compatible</b> with subquery.
The outer querys 'FROM' must have an alias applied ('AS')
The subquery creates a source of data which becomes available to the outer query.
This implies that the outer 'SELECT' can only select columns available through 'FROM' subquery.

###### eg.
```SQL
SELECT name, price_weight_ratio
FROM 
--subquery
(
SELECT name, price / weight AS price_weight_ratio
FROM products
) AS p
WHERE price_weight_ratio > 5;
```

###### eg. Subquery in FROM clause which returns single value
```SQL
SELECT *
FROM 
--subquery
(SELECT MAX(price) FROM products) 
AS p;
```

##### when do we need a subquery in FROM clause? 
###### eg. find the average number of orders for all users (using subquery in FROM)
(total number of orders) divided by (total number of users)
possible solution: 
  1. GROUP BY - to group orders by user_id -> gives us bucket for each unique user_id
  2. rows are assigned to bucket by user_id
  3. COUNT(*) - add up orders in each group

```SQL
/*
At this point, because of the group by, cannot actually get average from the SQL statement
because SELECT is being applied to bucket row, using SELECT user_id, 
AVG() would apply to the bucket row.
*/
SELECT user_id, COUNT(*)
FROM orders
GROUP BY user_id;
```

```SQL
/*solution - wrap as a subclause*/
SELECT AVG(p.order_count)
FROM (
SELECT user_id, COUNT(*) AS order_count
FROM orders
GROUP BY user_id;
) AS p
```
###### Eg. calculate the average price of phones for each manufacturer. then print the highest average price. rename this value to max_average_price.
table phones (name, manufacturer, price, units_sold)

```SQL
SELECT MAX(p.average_price) AS max_average_price
FROM 
(
SELECT AVG(price) as average_price
FROM phones
GROUP BY manufacturer
) AS p;
```

#### Subqueries in JOIN
we can put anything in 'JOIN' clause as long as this data is compatible with 'ON'
JOIN classes that have subqueries require aliases using 'AS'. 

```SQL
SELECT first_name
FROM users
JOIN (
  SELECT user_id FROM orders WHERE product_id = 3
) AS o
ON o.user_id = user.id;
```

#### Subqueries in WHERE
Operator in WHERE should return this structure of data.

```SQL
>                 --single value
<                 --single value
>=                --single value
<=                --single value
=                 --single value
<> or !=          --single value
IN                --single column
NOT IN            --single column

> ALL/SOME/ANY    --single column
< ALL/SOME/ANY    --single column
>= ALL/SOME/ANY   --single column
<= ALL/SOME/ANY   --single column
= ALL/SOME/ANY    --single column
<> ALL/SOME/ANY   --single column
```

###### eg. IN operator
orders(id, user_id, product_id, paid)
products(id, name, department, price, weight)
```SQL
SELECT id
FROM orders
WHERE product_id IN (
  SELECT id FROM products WHERE price / weight > 50
);
```

###### eg. show the name of all products with a price greater than the average product price
table products(id, name, department, price, weight)

```SQL
SELECT name
FROM products
WHERE price > (
  SELECT AVG(price) FROM products
)

```
##### ALL operator
Write a subquery that returns a single column 
and the check in 'WHERE' will only succeed if some value meets the ALL check

###### eg. 
Show the name, department and price of products
that are more expensive 
than all products in the 'industrial department'

table products(id, name, department, price, weight)
```SQL
SELECT name, department, price
FROM products
WHERE price > ALL (SELECT price FROM products WHERE department = 'industrial')
```

##### SOME / ANY operator
alias for SOME is 'ANY'.
SOME returns a column, and the check in 'WHERE' will succeed if SOME matches atleast one of the values.

```SQL
SELECT name, department, price
FROM products
WHERE price > SOME (SELECT price FROM products WHERE department = 'industrial')
```

#### Correlated Subquery
Similar to double nested for-loop.
Referring to some row in the outer query from inner SUBQUERY.

###### eg. show name, department, price of the most expensive product in each department
table products(id, name, department, price, weight)

```SQL
--SELECT FROM p1 only WHERE its price is equal the max of p2
SELECT name, department, price
FROM products AS p1
WHERE p1.price  = (
  --SELECT MAX value FROM p2
  SELECT MAX(price)
  FROM products AS p2

  --referring to outer row
  WHERE p1.department = p2.department
)
```
###### eg. (without using a join or a group by) print the number of orders for each product

table order(id, user_id, product_id, paid)
table products(id, name, department, price, weight)

```SQL
--hint: use correlated subquery in SELECT
SELECT p1.name, 
(
  SELECT COUNT(*) 
  FROM orders AS o1 
  WHERE o1.product_id = p1.id
) AS num_orders

FROM products AS p1
```

#### Select without a FROM 
Using SELECT (subquery) syntax, 
the subquery needs to return a single value
when would we use this? 
* when you want calculate just 1 row of values
* when you want the result of some math around couple of values combined together

```SQL
SELECT 
(
  SELECT MAX(price) FROM products
) 
/ 
(
  SELECT AVG(price) FROM products
)
```
---
###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## 9. Destinct
SQL keyword: DESTINCT
Will always be inside 'SELECT'
Gives all unique values inside a column.
Similar to 'GROUP BY', you can use 'GROUP BY' instead of 'DISTINCT', 
but cannot use 'DISTINCT' instead of 'GROUP BY'.
only GROUP BY can use aggregate functions to take a look at values inside of those different groups.
restrictions: if you use a DISTINCT on 2 or more columns, you cannot do a COUNT() on it.

###### eg. select all unique departments from products table
```SQL
SELECT DESTINCT department
FROM products;
```

###### eg. select number of unique departments from products table
```SQL
SELECT COUNT(DESTINCT department)
FROM products;
```

---

###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## 10. Utility Operators, Keywords, and Functions

#### GREATEST
selecting greatest value out of a list of values
```SQL
--gives us 30
SELECT GREATEST(20,10,30);
```

###### eg. greatest value between 30 or (2 * weight)
```SQL
SELECT name, weight, GREATEST(30, 2 * weight) FROM products;
```

#### LEAST
opposite of GREATEST

```SQL
SELECT name, price, LEAST(price * 0.5, 400) FROM products;
```

#### CASE
basically a switch statement
ELSE is optional default, default value is NULL
not often used as more often comparison calculations are done at code / application level.

```SQL
SELECT 
  name,
  price,
  CASE
    WHEN price > 600 THEN 'high'
    WHEN price > 300 THEN 'medium'
    ELSE 'cheap'
  END
FROM products;
```

---

###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## 11. Database validation and constraints
Validation should be applied both on web server code AND the database and spread in both locations. 

##### Validation on webserver
* Web server allows more complex validation.
* easier to apply new validation rules
* many libraries to handle validation automatically (eg. regex validation)

##### Validation on database
* validation still applied even connecting without web server
* guaranteed validation is always applied
* can apply validation rules ONLY IF existing rows satisfy constraint (consistency)

omitting a column value assigns 'null' or uses a default if it is set.

* Row-level validation
  * NOT NULL
  * UNIQUE
  * DEFAULT

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
  *(column named needs to be in parenthesis)

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


---
###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## 12. PostgreSQL 
* Installing postgreSQL installs pgadmin.
* Pgadmin is a web-based tool to manage and inspect a postgres database.
* One postgres server can have multiple databases.
* One app usually associated with one database.
* use Query Editor to test SQL on a specific database
* view table definition by clicking on database -> expanding schemas -> tables
  (right click on table) -> view/edit data -> all rows

#### Installation

* installation https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
* during install -> uncheck stack builder
* password is password for local machine
* run pgAdmin 4 -> password is to access pgadmin
* clicking on servers -> requested password is password for localmachine.
* have to refresh table to see updated info.

---
