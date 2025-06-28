###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## Section 08 - Unions and intersections with Sets

### UNION / UNION ALL / INTERSECT / INTERSECT ALL / EXCEPT / EXCEPT ALL

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

INTERSECT - find duplicates (shows only one of duplicate)
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
