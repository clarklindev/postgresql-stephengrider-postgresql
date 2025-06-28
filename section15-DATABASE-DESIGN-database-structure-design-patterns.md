### Schema designers

help you structure database tables and columns, data types
shows the relationship between tables.

##### code-based

benefits include allowing you to commit diagram code to repository

- [dbdiagram.io](http://dbdiagram.io)

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

- [quickdatabasediagrams.com](quickdatabasediagrams.com)

##### diagram based

- [ondras.zarovi.cz/sql/demo](ondras.zarovi.cz/sql/demo)
- [drawsql.app](http://drawsql.app)
- [sqldbm.com](sqldbm.com)

---
