# Section 02 - Filtering records

##### Order of SQL commands

1. SELECT - table to use
2. FROM - specifies starting set of rows to work with
3. JOIN - Merges in data from additional tables
4. WHERE - filters the set of rows
5. GROUP BY - groups rows by a unique set of values
6. HAVING - filters the set of groups

##### WHERE

- To make things easier to understand and read, think of SQL statements by reading it in this order:

1. FROM table
2. filter with WHERE
3. select COLUMN(S)

FROM cities, WHERE area > 4000, SELECT name

```SQL
SELECT name FROM cities WHERE area > 4000;
```

##### Comparison Math operators

- SQL order of execution is mathematical statements before comparisons
- eg. WHERE population / area > 5000; will first calculate population/area then compare > 5000;

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
