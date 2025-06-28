###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## Section 05. Aggregation of Records

The formation of a number of things into a cluster.
2 ways we can group data:

### Aggregates

Looks at many rows and calculates a <b>single</b> value.
Keywords used mostly are: 'most', 'average', 'least'.

- cannot use a SELECT on aggregate function AND select a normal column at the same time.

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
use COUNT(\*) to not look at a specfic column but count number of rows of a table (includes NULLs)

```SQL
SELECT count(*) FROM photos;
```

### Grouping (GROUP BY)

- SQL syntax: 'GROUP BY'
- reduces many rows down to <b>fewer rows</b>
- postgres create an "imaginary group column", and rows are grouped under a respective group
- NB: you <b>can only use SELECT on whats defined in the GROUP BY</b> (not the normal column from table) when using GROUP BY.
- can also select normal table columns by using <b>an aggregate function</b>.

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

###### eg.given a table of 'phones', print the names of 'manufacturers' and total revenue(price \* units_sold) for all phones. only print the manufacturers who have revenue greater than 2000000 for all the phones they sold.

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
