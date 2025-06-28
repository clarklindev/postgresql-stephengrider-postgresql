###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## Data Migration

if you have to update a table's structure,

STEPS:

1. first add the new column (schema migration) allow DEFAULT null values

// time can pass between these steps

2. deploy new API that will write data to both old columns (eg. lat, lng) and new column eg. loc (x, y)
   newer posts will have data in all the columns (lat, lng, loc)

3. copy data over (data migration) (eg. (lat, lng) -> loc
   every loc value with null value, copy over (lat, lng) to loc

4. update code to write ONLY to loc column

5. drop old column(s) (schema migration) (eg. lat, lng)

DO NOT MIX SCHEMA MIGRATIONS and DATA MIGRATIONS together
ie. use 3 separate migration files instead of one.

##### requirement - execute inside a transaction

You do not want to have a migration in a half executed state.
it is common to execute migration inside a transaction.

if an error occurs, you want to rollback the entire transaction and the entire thing gets canceled and
no changes happen on the database.

because copying data within a database can be a time consuming process;
when copying, postgres is makes a copy of the table at a certain point in time ('on the side') and once complete, a commit is made.. during this time the api server can still be creating requests and saving to the database without the new data being added to the migration copy 'on the side', they are not included as part of the transaction.
the later data is lost and gets 'null' values.

---
