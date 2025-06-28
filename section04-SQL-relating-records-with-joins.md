###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## Section 04 - Relating Records with Joins

- Produces values by <b>merging together rows</b> from different <b>related</b> tables.
- Joins are used to find data from multiple sources.

'FROM' selects all columns from that table and joins on another table,
'ON' is criteria to match the columns;
'SELECT' assumes the tables are 'joined' and we can pick out the columns wanted from the 'JOIN'.

- When tables have same column names, specify where data is coming from by using 'tablename.' to specify ownership
- 'AS' keyword can be used to rename the selected column name

###### basic join

```SQL
SELECT contents, username
FROM comments
JOIN users ON users.id = commments.user_id;
```

###### renaming a column with 'AS'

```SQL
SELECT comments.id AS comment_id, photo.id
FROM photos
JOIN comments ON photos.id = comments.photo_id;
```

###### using a renamed column

```SQL
SELECT comments.id, p.id
FROM photos AS p
JOIN comments on p.id = comments.photo_id;
```

##### Types of joins

1. inner join (JOIN)
2. left outer join (LEFT JOIN)
3. right outer join (RIGHT JOIN)
4. full join (FULL JOIN)

Using the following tables:

##### photos

| id  | url               | user_id |
| --- | ----------------- | ------- |
| 1   | http://www.a.com/ | 2       |
| 2   | http://www.b.com/ | 1       |
| 3   | http://www.c.com/ | 3       |
| 4   | http://www.d.com/ | NULL    |

##### users

| id  | username |
| --- | -------- |
| 1   | Apple.A  |
| 2   | Boat.B   |
| 3   | Cat.C    |
| 4   | Dog.D    |

#### inner join (JOIN)

if any match is not met in the foreign key, it is omited.
if content is not used, it is omitted.
this is the default join.

```SQL
SELECT url, username
FROM photos
JOIN users ON users.id = photos.user_id;
```

results from join:

- photos table has NULL foreign key for id: 4 (omitted)
- users table id: 4 is not used (omitted)

| id  | url               | user_id | id  | username |
| --- | ----------------- | ------- | --- | -------- |
| 1   | http://www.a.com/ | 2       | 2   | Boat.B   |
| 2   | http://www.b.com/ | 1       | 1   | Apple.A  |
| 3   | http://www.c.com/ | 3       | 3   | Cat.C    |

#### left outer join (LEFT JOIN)

all content in FROM table is kept.
if it does not find link to a foreign key, NULL values are used in joined table.
if content from joined in table is not used, it is omitted.

```SQL
SELECT url, username
FROM photos
LEFT JOIN users ON users.id = photos.user_id;
```

results from join:

- NULL is filled in for missing foreign key linked table values
- users table id: 4 is not used (omitted)

| id  | url               | user_id | id   | username |
| --- | ----------------- | ------- | ---- | -------- |
| 1   | http://www.a.com/ | 2       | 2    | Boat.B   |
| 2   | http://www.b.com/ | 1       | 1    | Apple.A  |
| 3   | http://www.c.com/ | 3       | 3    | Cat.C    |
| 4   | http://www.d.com/ | NULL    | NULL | NULL     |

#### right outer join (RIGHT JOIN)

all content from joined-in table is used;
if it is not linked with foreign key in 'FROM' table, NULL values will then be used.
content from 'FROM' table is ommited if it cant be linked via foreign key.

```SQL
SELECT url, username
FROM photos
RIGHT JOIN users ON users.id = photos.user_id;
```

results from join:

- rows in 'FROM' table without links to foreign keys is (omitted)

| id   | url               | user_id | id  | username |
| ---- | ----------------- | ------- | --- | -------- |
| 1    | http://www.a.com/ | 2       | 2   | Boat.B   |
| 2    | http://www.b.com/ | 1       | 1   | Apple.A  |
| 3    | http://www.c.com/ | 3       | 3   | Cat.C    |
| NULL | NULL              | NULL    | 4   | Dog.D    |

#### full join (FULL JOIN)

All content from both tables will be used.
NULL values are filled in.

```SQL
SELECT url, username
FROM photos
FULL JOIN users ON users.id = photos.user_id;
```

| id   | url               | user_id | id   | username |
| ---- | ----------------- | ------- | ---- | -------- |
| 1    | http://www.a.com/ | 2       | 2    | Boat.B   |
| 2    | http://www.b.com/ | 1       | 1    | Apple.A  |
| 3    | http://www.c.com/ | 3       | 3    | Cat.C    |
| 4    | http://www.d.com/ | NULL    | NULL | NULL     |
| NULL | NULL              | NULL    | 4    | Dog.D    |

#### Variations on joins using 'WHERE' to filter results

```SQL
SELECT url, contents
FROM comments
JOIN photos ON photos.id = comments.photo_id
WHERE comments.user_id = photos.user_id;
```

#### 3-way join (Ménage à trois)

merging together 3 different tables

- key is that on the second join, there is a more complicated merging expression.

- we are looking for common users.id in both comments.user_id and photos.user_id

```SQL
SELECT url, contents, username
FROM comments
JOIN photos ON comments.photo_id = photos.id
JOIN users ON users.id = comments.user_id AND users.id = photos.user_id;
```

---
