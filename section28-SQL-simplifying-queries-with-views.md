###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## section28 - SQL-simplifying-queries-with-views

### Views

fixing mistakes in the design of table creation process where you constantly have to perform eg. JOINS for queries when you should have maybe had combined tables.
Better way to merge tables together without deleting original tables.

A view is a "fake" table that has rows from other tables.
These can be exact rows or computed values.
can reference a view in any place where we usually reference a table.
view doesnt actually create a table or move data around.

Views can be created ahead of time,
can be refferenced in different queries (whereas CTE's can only be reffered to in the query they are attached to)

you want to create a view when there is an operation that's logic you will execute often.

view all views -> pgadmin - > schemas -> public views

```SQL
--creating a view
CREATE VIEW tags AS(
    SELECT id, created_at, user_id, post_id, 'photo_tag' AS type FROM photo_tags
    UNION ALL
    SELECT id, created_at, user_id, post_id, 'caption_tag' AS type FROM caption_tags
);

--reference view from another different query
SELECT username, COUNT(*)
FROM users
JOIN tags ON tags.user_id = users.id
GROUP BY username
ORDER BY COUNT(*) DESC;
```

##### updating view (change the definition)

syntax: CREATE OR REPLACE VIEW \_ AS

```SQL
    CREATE OR REPLACE VIEW recent_posts AS (
        SELECT * FROM posts
        ORDER BY created_at DESC
        LIMIT 15
    )
```

##### deleting a view

```SQL
    DROP VIEW recent_posts;
```

---
