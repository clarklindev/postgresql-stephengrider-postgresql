###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## Advanced Query tuning

using index vs loading all up in memory and reading sequencially:

- assumption that jumping to specific blocks/random child page is 4x as long (eg. x2 pages loaded) = 4 x 2 = 8 units

- compared to sequencial reading x1 (assume 1x base value) which is loading for each page x 110 per file to search through list = 110 x 1 = 110 units

eg. EXPLAIN ANALYZE -

Seq Scan on comments (cost=0.00...1589.10 rows=60410 width=72) (actual time = 0.008...14.29). 60410 rows, 985 pages.

loading up a page to memory is more expensive than sequencial reading of rows
attempting formula:

1.0 (assume score is 1.0 as base to judge everything else in terms of estimate costs)
0.01 (assume loading row is 1% cost of loading up row)

(# pages) _ 1.0 + (# rows) _ (0.01)

(985) _ 1.0 + (60410) _ (0.01) = 1589.1 (same estimate as EXPLAIN ANALYZE execution)

##### actual formula for cost for any step of query plan (EXPLAIN ANALYZE)

link specifics default values for costs to calculations. sequencial base cost (seq_page_cost) is the default and all other costs are relative to that.

[runtime config query - postgresql.org/docs/current/runtime-config-query.html](http://postgresql.org/docs/current/runtime-config-query.html)
19.7 Query Planning -> 19.7.2 Planner cost constants

random_page_cost -> 4x more expensive as fetching page in order (seq_page_cost)

seq_page_cost -> 1x (default base that all other costs relative to)

cpu_tuple_cost -> 0.1 (processing a single tuple (row) is 1% as expensive as fetching a page in order (seq_page_cost))

cpu_index_tuple_cost - 0.005 (processing a tuple from an index is 50% as expensive as processing a real row (cpu_tuple_cost))

cpu_operator_cost - 0.0025 (running an operator or function is 50% as expensive as processing an index tuple (cpu_index_tuple_cost))

##### Cost for steps of query plan =

(# pages read sequentially) \* seq_page_cost

- (# page read at random) \* random_page_cost
- (# rows scanned) \* cpu_tuple_cost
- (# index entries scanned) \* cpu_index_tuple_cost
- (# times function/operator evaluated) \* cpu_operator_cost

Cost for sequential read =
(# pages read sequentially) \* seq_page_cost

- (# rows scanned) \* cpu_tuple_cost

---
