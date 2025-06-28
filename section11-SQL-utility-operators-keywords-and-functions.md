###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## Section 11 - Utility Operators, Keywords, and Functions

#### GREATEST

selecting greatest value out of a list of values

```SQL
--gives us 30
SELECT GREATEST(20,10,30);
```

###### eg. greatest value between 30 or (2 \* weight)

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
