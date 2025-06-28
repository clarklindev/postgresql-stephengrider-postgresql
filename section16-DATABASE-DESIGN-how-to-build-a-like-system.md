###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

### Like system

Features

- like button

Rules

- users can like a post single time
- user should be able to unlike a post
- figure out how many users liked a post
- list which users liked a post
- liked comments
- support for other features like dislike
- or integration of reaction system

#### Like system

Example of maybe how a like system tables would be structured
Likes table - a unique constraint with UNIQUE(user_id, post_id)
If a user wants to unlike a post, you'd find the user_id and post_id in likes table and remove that row
This pattern is compatible with: likes, favorites, bookmarks all the same way.

###### users

| id  | username |
| --- | -------- |
| 1   | Boat.B   |
| 2   | Apple.A  |
| 3   | Cat.C    |
| 4   | Duck.D   |
| 5   | Egg.E    |

###### likes

| id  | user_id | post_id |
| --- | ------- | ------- |
| 1   | 3       | 5       |
| 2   | 1       | 1       |
| 3   | 4       | 2       |
| 4   | 3       | 3       |
| 5   | 3       | 5       |

###### posts

| id  | url     |
| --- | ------- |
| 1   | pic.jpg |
| 2   | pic.jpg |
| 3   | pic.jpg |
| 4   | pic.jpg |
| 5   | pic.jpg |

```SQL
-- number of likes on post with id = 3
SELECT COUNT(*)
FROM likes
WHERE post_id = 3;

--ID's of top five most liked posts
SELECT posts.id
FROM posts
JOIN likes ON likes.post_id = posts.id
GROUP BY posts.id
ORDER BY COUNT(*) DESC
LIMIT 5;

--username of people who like post with id=3
SELECT username
FROM likes
JOIN users ON users.id = likes.user_id
WHERE post_id = 3;

--URL of posts that user with id=4 liked
SELECT url
FROM likes
JOIN posts.id = likes.post_id
WHERE likes.user_id = 4;
```

---

###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

#### Reaction system

possible way to design a reaction system would be to use a type of reaction column
Note: below is a polymorphic association

###### reactions

| id  | user_id | post_id | type  |
| --- | ------- | ------- | ----- |
| 1   | 3       | 5       | like  |
| 2   | 1       | 1       | love  |
| 3   | 4       | 2       | care  |
| 4   | 3       | 3       | funny |
| 5   | 3       | 5       | sad   |

### 3 ways to design like tables (comments, posts)

##### 1. polymorphic association (generally not recommended)

Disadvantage is that 'liked_id' in likes table is not the foreign key column,
because we cant tell postgres which column is the foreign key going to be for.
bad for data consistency.

- table users (id)

- table likes (id, user_id, liked_id, liked_type)

| id  | user_id | liked_id | liked_type |
| --- | ------- | -------- | ---------- |
| 1   | 3       | 2        | post       |
| 2   | 1       | 1        | comment    |
| 3   | 4       | 2        | post       |
| 4   | 3       | 3        | comment    |
| 5   | 3       | 1        | post       |

- table posts (id, url)

- table comments (id, contents)

##### 2. polymorphic association (alternative)

- choice of this strategy for like system is because the LIKE system only has support for like of comment and post.
- Disadvantage - likes table can bloat when a lot of columns related to like is added
- can treat comment_id and post_id as foreign keys.
- Either post_id or comment_id will be NULL.
- Validation with CHECK / COALESCE needs to be added to make sure only one is select AND both are not NULL

Add CHECK of (
COALESCE((post_id)::BOOLEAN::INTEGER, 0)

- COALESCE((comment_id)::BOOLEAN::INTEGER,0)
  ) = 1

_::BOOLEAN converts to true or false
_::INTEGER converts to 1 or 0

- table users (id)

- table likes (id, user_id, post_id, comment_id)

| id  | user_id | comment_id | post_id |
| --- | ------- | ---------- | ------- |
| 1   | 3       | 1          | NULL    |
| 2   | 1       | NULL       | 3       |
| 3   | 4       | 2          | NULL    |
| 4   | 3       | NULL       | 2       |
| 5   | 3       | NULL       | 2       |

- table posts (id, url)

- table comments (id, contents)

```sample code
Table users{
  id SERIAL [pk, increment]
  created_at TIMESTAMP
  updated_at TIMESTAMP
  username VARCHAR(30)
}

Table comments {
  id SERIAL [pk, increment]
  created_at TIMESTAMP
  updated_at TIMESTAMP
  contents VARCHAR(200)
  user_id INTEGER [ref: > users.id]
  post_id INTEGER [ref: > posts.id]
}

Table posts {
  id SERIAL [pk, increment]
  created_at TIMESTAMP
  updated_at TIMESTAMP
  url VARCHAR(200)
  user_id INTEGER
}

Table likes {
  id SERIAL [pk, increment]
  created_at TIMESTAMP
  user_id INTEGER [ref: > users.id]
  post_id INTEGER [ref: > posts.id]
}

```

##### 3. simplest method

Straight forward solution: each thing being liked has their own 'like' table
disadvantage - creating a table for each thing to like
advantage is customizable tables for each thing we liking

- table users (id)
- table post_likes (id, user_id, post_id)

| id  | user_id | post_id |
| --- | ------- | ------- |
| 1   | 3       | 1       |
| 2   | 1       | 3       |
| 3   | 4       | 2       |

- table comment_likes (id, user_id, comment_id)

| id  | user_id | comment_id |
| --- | ------- | ---------- |
| 1   | 3       | 3          |
| 2   | 1       | 1          |
| 3   | 4       | 2          |

- table posts (id, url)
- table comments (id, contents)

---
