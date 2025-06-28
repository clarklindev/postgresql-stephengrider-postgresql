###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## Section 30 - Handling Concurrency and Reversibility with Transactions

locks to updates to ensure execution succeeds in order.
Transactions ensure all execute successfully or none execute successfully (roll-back).
when opening up a transaction, database makes an 'isolated workspace'. any SQL statements run are isolated until transaction ends with COMMIT.

##### Opening a transaction / complete a transaction

```SQL
BEGIN; --executing starts a transaction

---some sql

COMMIT; -- to finish transaction
```

##### closing a transaction

If an error occurs after BEGIN call, manually run ROLLBACK needs to be executed.
if a crash occurs, postgres rolls back transaction

##### Simulating a crash / recover from error

(postgress-> dashboard -> server activity -> \*(close connections that have 'CONN'))
if you check database, postgres did an auto rollback.

```SQL
ROLLBACK; -- revert
```
