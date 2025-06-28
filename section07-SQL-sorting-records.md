###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## Section 07 - Sorting Records (ORDER BY)

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
