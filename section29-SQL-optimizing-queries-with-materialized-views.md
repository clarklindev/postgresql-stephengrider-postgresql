###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

### Section 29 - Optimizing queries with materialized views

Query that gets executed only at very specific times, but the results are saved and
can be referenced without rerunning the query.

We make use of a materialized view when we have a very expensive query.
We can run a materialized view just one time and hang on to the results and refer back to it
without having to rerun the very expensive query.
'WITH DATA' is when we create the materialized view, tell postgreSQL to run query once and hold onto the results.
after running the materialized view, you can refer to it without running the query again.

```SQL
CREATE MATERIALIZED VIEW as weekly_likes AS (
  --query to materialize
  SELECT
    data_trunk('week', COALESCE(posts.created_at, comments.created_at)) AS week
    COUNT(posts.id) AS num_likes_for_posts,
    COUNT(comments.id) AS num_likes_for_comments
  FROM likes
  LEFT JOIN posts ON posts.id = likes.post_id
  LEFT JOIN comments ON comments.id = likes.comment_id
  GROUP BY week
  ORDER BY week
) WITH DATA; --'with data' is when we create the materialized view, tell postgreSQL to run query once and hold onto the results.

```

```SQL
SELECT * FROM weekly_likes;
```

##### Update data held by materialized view

modifying any data in materialized view (SQL statement), will require us to refresh the materialized view to keep the data in-sync

```SQL
REFRESH MATERIALIZED VIEW  weekly_likes;
```

---
