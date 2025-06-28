###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## Section 09 - Assembling Queries with SubQueries

### Subqueries

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

- many rows, many columns

```SQL
--many rows, many columns
SELECT * FROM orders;
```

- many rows, one column

```SQL
--many rows, one column
SELECT id FROM orders;
```

- one row, one column (single value AKA Scalar Query)

```SQL
---one row, one column (single value AKA Scalar Query)
SELECT COUNT(*) FROM orders;
```

#### Subqueries in SELECT

- subquery must <b>return a single value</b>

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
3. COUNT(\*) - add up orders in each group

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

- when you want calculate just 1 row of values
- when you want the result of some math around couple of values combined together

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
