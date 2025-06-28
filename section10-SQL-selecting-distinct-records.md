###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## Section 10 - Selecting Distinct Records

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
