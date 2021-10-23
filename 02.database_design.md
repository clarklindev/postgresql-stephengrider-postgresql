# NOTES: Database design

---

## Table of contents  

+ [Schema designers](#schema-designers)
+ [Like system](#like-system)
+ [Mention system](#mention-system)
+ [Hashtag system](#hashtag-system)
+ [follower system](#follower-system)

---  

### Schema designers
help you structure database tables and columns, data types
shows the relationship between tables.

##### code-based
benefits include allowing you to commit diagram code to repository

  * [dbdiagram.io](http://dbdiagram.io)

```sample code

Table users{
  id integer [pk, increment]
  username varchar
}

Table comments {
  id integer [pk, increment]
  contents varchar
  user_id int [ref: > users.id]
  post_id int [ref: > posts.id]
}

Table post {
  id integer [pk, increment]
  title varchar
}

```

  * [quickdatabasediagrams.com](quickdatabasediagrams.com)

##### diagram based
  * [ondras.zarovi.cz/sql/demo](ondras.zarovi.cz/sql/demo)
  * [drawsql.app](http://drawsql.app)
  * [sqldbm.com](sqldbm.com)


---

###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

### Like system
Features
* like button

Rules
* users can like a post single time
* user should be able to unlike a post
* figure out how many users liked a post
* list which users liked a post
* liked comments
* support for other features like dislike 
* or integration of reaction system

#### Like system
Example of maybe how a like system tables would be structured
Likes table - a unique constraint with UNIQUE(user_id, post_id)
If a user wants to unlike a post, you'd find the user_id and post_id in likes table and remove that row
This pattern is compatible with: likes, favorites, bookmarks all the same way. 
###### users
| id |  username |
| --- | --- | 
| 1 | Boat.B |
| 2 | Apple.A |
| 3 | Cat.C |
| 4 | Duck.D |
| 5 | Egg.E |

###### likes
| id | user_id | post_id |
| --- | --- | --- |
| 1 | 3 | 5 | 
| 2 | 1 | 1 |
| 3 | 4 | 2 |
| 4 | 3 | 3 |
| 5 | 3 | 5 |

###### posts
| id |  url |
| --- | --- | 
| 1 | pic.jpg |
| 2 | pic.jpg |
| 3 | pic.jpg |
| 4 | pic.jpg |
| 5 | pic.jpg |

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
| id | user_id | post_id | type |
| --- | --- | --- | --- |
| 1 | 3 | 5 | like |
| 2 | 1 | 1 | love |
| 3 | 4 | 2 | care |
| 4 | 3 | 3 | funny |
| 5 | 3 | 5 | sad |

### 3 ways to design like tables (comments, posts)

##### 1. polymorphic association (generally not recommended)
Disadvantage is that 'liked_id' in likes table is not the foreign key column,
because we cant tell postgres which column is the foreign key going to be for.
bad for data consistency.

* table users (id)

* table likes (id, user_id, liked_id, liked_type)

| id | user_id | liked_id | liked_type |
| --- | --- | --- | --- |
| 1 | 3 | 2 | post |
| 2 | 1 | 1 | comment |
| 3 | 4 | 2 | post |
| 4 | 3 | 3 | comment |
| 5 | 3 | 1 | post |

* table posts (id, url)

* table comments (id, contents)  

##### 2. polymorphic association (alternative)
* choice of this strategy for like system is because the LIKE system only has support for like of comment and post.
* Disadvantage - likes table can bloat when a lot of columns related to like is added
* can treat comment_id and post_id as foreign keys.
* Either post_id or comment_id will be NULL.
* Validation with CHECK / COALESCE needs to be added to make sure only one is select AND both are not NULL

Add CHECK of (
  COALESCE((post_id)::BOOLEAN::INTEGER, 0)
  +
  COALESCE((comment_id)::BOOLEAN::INTEGER,0)
) = 1

*::BOOLEAN converts to true or false
*::INTEGER converts to 1 or 0

* table users (id)

* table likes (id, user_id, post_id, comment_id)

| id | user_id | comment_id | post_id |
| --- | --- | --- | --- |
| 1 | 3 | 1 | NULL |
| 2 | 1 | NULL | 3 |
| 3 | 4 | 2 | NULL |
| 4 | 3 | NULL | 2 |
| 5 | 3 | NULL | 2 |

* table posts (id, url)

* table comments (id, contents)

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

* table users (id)
* table post_likes (id, user_id, post_id)

| id | user_id | post_id |
| --- | --- | --- |
| 1 | 3 | 1 |
| 2 | 1 | 3 |
| 3 | 4 | 2 |

* table comment_likes (id, user_id, comment_id)

| id | user_id | comment_id |
| --- | --- | --- |
| 1 | 3 | 3 |
| 2 | 1 | 1 |
| 3 | 4 | 2 |

* table posts (id, url)
* table comments (id, contents)

---

###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

### Mention system
* post can have caption (description of post)
* adding geolocation (long/lat)
* tagging people - position inside photo (x,y) then linking user to photo.
  - need to question if we need to retrieve list where user has been mentioned
  - most often mentioned?
  - notify user of being mentioned?



###### option 1 (user in photo tags and mention tags combined)
* null values for X,Y when its a mention

table tags
| id | user_id | post_id | x | y |
| --- | --- | --- | --- | --- |
| 1 | 3 | 3 | NULL | NULL |
| 2 | 1 | 1 | 544 | 31  |
| 3 | 4 | 2 | 233 | 122 |

###### option 2 (chosen option)
* separate tables for photo tags and caption tags

photo_tags

| id | user_id | post_id | x | y |
| --- | --- | --- | --- | --- |
| 1 | 3 | 3 | 344 | 322 |
| 2 | 1 | 1 | 544 | 31  |
| 3 | 4 | 2 | 233 | 122 |

caption_tags

| id | user_id | post_id |
| --- | --- | --- | 
| 1 | 3 | 3 |
| 2 | 1 | 1 | 
| 3 | 4 | 2 | 


update posts table and create tags table

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
  caption VARCHAR(240)
  lat REAL 
  lng REAL
}

Table likes {
  id SERIAL [pk, increment]
  created_at TIMESTAMP
  user_id INTEGER [ref: > users.id]
  post_id INTEGER [ref: > posts.id]
}

Table photo_id {
  id SERIAL [pk, increment]
  create_at TIMESTAMP
  updated_at TIMESTAMP
  post_id INTEGER [ref: > posts.id]
  user_id INTEGER [ref: > users.id]
  x INTEGER
  y INTEGER
}

Table caption_tags {
  id SERIAL [pk, increment]
  create_at TIMESTAMP
  post_id INTEGER [ref: > posts.id]
  user_id INTEGER [ref: > users.id]
}

```
---

###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

### Hashtag system

Hastags are used only in instagram search feature. 
search returns posts with hashtags in caption.

best way to model hastags is:
hastags_posts is a join table used to relate a hashtag to a post

* table hashtags (id, title (UNIQUE))

| id | title |
| --- | --- | 
| 1 | birthday |
| 2 | snow | 
| 3 | fun | 
| 4 | tree |


* table hastags_posts (id, hashtag_id, post_id)

| id | hashtag_id | post_id |
| --- | --- | --- | 
| 1 | 3 | 3 |
| 2 | 1 | 1 | 
| 3 | 4 | 4 | 


* posts (id, url, user_id)

| id | url | user_id |
| --- | --- | --- | 
| 1 | picture.jpg | 3 |
| 2 | picture.jpg| 1 | 
| 3 | picture.jpg | 4 |
| 4 | picture.jpg | 4 | 

adding table hashtags, hashtags_posts
updating users
```sample code
Table users{
  id SERIAL [pk, increment]
  created_at TIMESTAMP
  updated_at TIMESTAMP
  username VARCHAR(30)
  bio VARCHAR(400)
  avatar VARCHAR(200)
  phone VARCHAR(25)
  email VARCHAR(40)
  password VARCHAR(50)
  status VARCHAR(15)
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
  caption VARCHAR(240)
  lat REAL 
  lng REAL
}

Table likes {
  id SERIAL [pk, increment]
  created_at TIMESTAMP
  user_id INTEGER [ref: > users.id]
  post_id INTEGER [ref: > posts.id]
}

Table photo_id {
  id SERIAL [pk, increment]
  create_at TIMESTAMP
  updated_at TIMESTAMP
  post_id INTEGER [ref: > posts.id]
  user_id INTEGER [ref: > users.id]
  x INTEGER
  y INTEGER
}

Table caption_tags {
  id SERIAL [pk, increment]
  create_at TIMESTAMP
  post_id INTEGER [ref: > posts.id]
  user_id INTEGER [ref: > users.id]
}

Table hashtags {
  id SERIAL [pk, increment]
  created_at TIMESTAMP
  title VARCHAR(20)
}

Table hashtags_posts{
  id SERIAL [pk, increment]
  hashtag_id INTEGER [ref: > hastag.id]
  post_id INTEGER [ref: > post.id]  
}

```
---

###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

### follower system
* cannot follow self. CHECK (leader_id <> follower_id)
* can follow one person once. UNIQUE(leader_id, follower_id)

table followers (id, leader_id, follower_id)
table users (id, username)

```sample code
Table followers {
  id SERIAL [pk, increment]
  created_at TIMESTAMP
  leader_id INTEGER [ref: > users.id]
  follower_id INTEGER [ref: > users.id]
}
```

