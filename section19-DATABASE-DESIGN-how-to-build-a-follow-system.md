###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

### follower system

- cannot follow self. CHECK (leader_id <> follower_id)
- can follow one person once. UNIQUE(leader_id, follower_id)

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

---
