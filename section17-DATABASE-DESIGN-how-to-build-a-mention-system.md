###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

### Mention system

- post can have caption (description of post)
- adding geolocation (long/lat)
- tagging people - position inside photo (x,y) then linking user to photo.
  - need to question if we need to retrieve list where user has been mentioned
  - most often mentioned?
  - notify user of being mentioned?

###### option 1 (user in photo tags and mention tags combined)

- null values for X,Y when its a mention

table tags
| id | user_id | post_id | x | y |
| --- | --- | --- | --- | --- |
| 1 | 3 | 3 | NULL | NULL |
| 2 | 1 | 1 | 544 | 31 |
| 3 | 4 | 2 | 233 | 122 |

###### option 2 (chosen option)

- separate tables for photo tags and caption tags

photo_tags

| id  | user_id | post_id | x   | y   |
| --- | ------- | ------- | --- | --- |
| 1   | 3       | 3       | 344 | 322 |
| 2   | 1       | 1       | 544 | 31  |
| 3   | 4       | 2       | 233 | 122 |

caption_tags

| id  | user_id | post_id |
| --- | ------- | ------- |
| 1   | 3       | 3       |
| 2   | 1       | 1       |
| 3   | 4       | 2       |

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
