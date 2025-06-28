###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## section 27 - Recursive Common table expressions (CTE)

use when you have a tree or graph type data structure.
Recursive CTE Must use UNION.
be able to identify when you are able to use a recursive CTE.

a real-life example would be the 'suggestion follow' tree on instagram.

###### non-RECURSION

STEP 1:

- define the results table and working table (posgres creates these behind the scenes)
- these tables get columns of whats inside the () in `WITH RECURSIVE functionname(val)` eg. both tables get 'val' column

STEP 2:
Run the initial non-recursive statement, put the results into the results table and working table.

###### RECURSION

STEP 3:
Run the recursive statement replacing the table name 'countdown' with a reference to the working table (do this mentally not in SQL).

- (eg. SELECT val -1 FROM workingtable WHERE val > 1)

STEP 4:
if recursive statement (from STEP 3) returns some rows, append them to the results table.
clear the working table, and put returned value in working table and run recursion again.

STEP 5:
if recursive statement returns no rows, stop recursion. else run from STEP 3 again

STEP 6:
rename the results table back to the name of recursive function.
Make function available to rest of the SLQ query.

```SQL
WITH RECURSIVE countdown(val) AS (
  SELECT 3 AS val -- initial / non-recursive query

  UNION

  --recursive query
  SELECT val - 1 FROM countdown WHERE val > 1
)

SELECT *
FROM countdown;
```

###### eg. instagram follow tree

figuring out who to suggest to follow: we pick eg. user id 1
then we see who they are following (eg. user id 5, 4)
then because user 1 is already following 5,4; we are more interested in who to suggest (ie who 5 and 4) are following (6,2,3).
Kevin hart is following 6,2.
the rock is following 3.
and then you can go multi-levels deeper to see who they are following.

table users(id, username)
| id | username |
|---| --- |
| 1 | Hallie |
| 2 | Justin Bieber |
| 3 | Jennifer Lopez |
| 4 | The Rock |
| 5 | Kevin Hart |
| 6 | Snoop Dog |

table followers(id, leader_id, follower_id)
|id | leader_id | follower_id|
|---| --- | ---|
| 1 | 5 | 1 |
| 2 | 6 | 5 |
| 3 | 7 | 2 |
| 4 | 4 | 1 |
| 5 | 2 | 5 |
| 6 | 3 | 4 |

```SQL
--depth will be used for filtering out higher levels to build result.
--to speed up query, change LIMIT 30 to a lower value so less results.

WITH RECURSIVE suggestions(leader_id, follower_id, depth) AS (

    --non-recursive statement
    SELECT leader_id, follower_id, 1 AS depth
    FROM followers
    WHERE follower_id = 1 --using user id 1 who to make suggestions for

  UNION
    --recursive statement
    SELECT followers.leader_id, followers.follower_id, depth + 1
    FROM followers
    JOIN suggestions ON suggestions.leader_id = followers.follower_id
    WHERE depth < 2
)
SELECT DISTINCT users.id, users.username
FROM suggestions
JOIN users ON users.id = suggestions.leader_id
WHERE depth > 1
LIMIT 30;

```

result table: who to suggest for user 1.

table suggestions (leader_id, follower_id, depth)
| leader_id | follower_id | depth |
|---| --- | ---|
| 6 | 5 | 2 |
| 2 | 5 | 2 |
| 3 | 4 | 2 |

---
