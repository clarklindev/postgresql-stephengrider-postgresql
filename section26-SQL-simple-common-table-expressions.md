###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## 12. Simple Common table expressions

rewriting a query so its easier to read with 'WITH \_ AS'.
creating a table that can be used inside the main SQL query. making it easier to read.
can be used in recursive table expressions.

```SQL
WITH tags AS (
  SELECT user_id, created_at FROM caption_tags
  UNION ALL
  SELECT user_id, created_at FROM photo_tags
)

SELECT username, tags.created_at
FROM users
JOIN tags ON tags.user_id = users.id
WHERE tags.created_at < '2010-01-07'

```
