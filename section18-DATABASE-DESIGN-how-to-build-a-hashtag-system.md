###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

### Hashtag system

Hastags are used only in instagram search feature.
search returns posts with hashtags in caption.

best way to model hastags is:
hastags_posts is a join table used to relate a hashtag to a post

- table hashtags (id, title (UNIQUE))

| id  | title    |
| --- | -------- |
| 1   | birthday |
| 2   | snow     |
| 3   | fun      |
| 4   | tree     |

- table hastags_posts (id, hashtag_id, post_id)

| id  | hashtag_id | post_id |
| --- | ---------- | ------- |
| 1   | 3          | 3       |
| 2   | 1          | 1       |
| 3   | 4          | 4       |

- posts (id, url, user_id)

| id  | url         | user_id |
| --- | ----------- | ------- |
| 1   | picture.jpg | 3       |
| 2   | picture.jpg | 1       |
| 3   | picture.jpg | 4       |
| 4   | picture.jpg | 4       |

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
