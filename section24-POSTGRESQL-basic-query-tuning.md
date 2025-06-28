###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## Query tuning

When postgres receives query

1. goes into parser: splits up the query and figures out what each SQL keyword means
2. after evaluation, it builds a query tree (programatic tree of query)
3. rewriter takes tree and makes adjustments to it.
4. planner takes a look at query tree and strategizes to get that information.
5. planner picks a strategy
6. executer executes strategy

keywords:

- EXPLAIN - build query plan and display info about it. (plan)

- EXPLAIN ANALYZE - build query plan, RUN IT!, and display info about it. (plan + run)

both keywords are only used for performance optimization and never for production.
pgadmin has a explain analyze button (make sure all options are checked).
How to read explain analyze output:
go to deepest level of query node of query plan (most indented), we can imagine that they keep passing information up to the nearest parent node.

```SQL
SELECT *
FROM pg_stats
WHERE tablename = 'users';
```

postgres is able to make asumptions of (rows, width) in output of EXPLAIN ANALYZE because it actually keeps stats about whats going on in the database.

##### Cost

EXPLAIN ANALYZE -> cost
amount of time to execute a part of a query.

- query plan has something like (cost=9.4...1233.11)
  - 9.4 is the cost to calculate the first row value
  - 1233.11 is the cost to calculate all rows
- cost of parent node in query plan is the sum of all child nodes' costs.

---
