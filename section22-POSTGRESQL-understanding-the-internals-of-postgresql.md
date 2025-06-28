###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## Understanding the Internals of PostgreSQL

#### where postgreSQL stores data

```SQL
show data_directory;
```

this gives us a path like: /users/_username_/library/application support/postgres/var-12
all database content is stored in 'base' folder

#### Folder where database is stored

results are table(oid, datname).
the oid is the internal identifier (which is also the folder name inside the 'base' folder) that is associated with a database

```SQL
SELECT oid, datname
FROM pg_database;
```

#### file where database table is stored

inside that folder, each file represents one object inside database
table (oid, relname, relnamespace, reltype ...etc)

```SQL
SELECT * FROM pg_class;
```

each row represents an object refers to eg. tables, indexes, primary keys.
so find the table we want and look at associated 'oid',
that will be name of file which will contain all data for that object. eg. 22445

- Heap file - file that contains all the data (rows) of our table
- page or block - heap is divided into many different 'blocks' or 'pages'. Each page/block stores a number of rows
- tuple or item - individual row from the table.

Heap file is divided up into many page/blocks and each page/block has many tuple/item/rows.
each block is 8kb.

- Block is binary data (stores 0's and 1's) and divided up into parts.
- begining part stores information about block,
- then next few blocks stores information about rows, where to find data.
- free space
- actual data for tuples.

#### deciphering a page/block

[postgreSQL docs about page/block](http://postgresql.org/docs/current/storage-page-layout.html)

- Table 68.2 Overall Page layout

- view with hex reader (vs code extensions - microsoft hex editor)
- open the file with the hex editor (CTRL+SHIFT+P) -> hex editor
- hex code is actual "shortcut" or encoded binary 1's and 0's
- each hex is 1 byte.

#### Page Layout

- PageHeaderData

##### PageHeaderData

24 bytes long. contains information about page
Table 68.3 PageHeaderData layout

- pd_lsn - 8 bytes
- pd_checksum - 2 bytes
- pd_flags - 2 bytes
- pd_lower - 2 bytes (\*offset to start of free space)
- pd_upper - 2 bytes (\*offset to end of free space)
- pd_special - 2 bytes
- pd_pagesize_version
- pd_prune_xid

pd_lower:
Once we know where pd_lower is located - we know the number of bytes starting at beginning of page to start off free space.
clicking on first byte -> then in hex editor (Data inspector) - pd_lower - Int16 value -> eg. 228
228 means we count off 228 bytes from start of page/block (228 / 16 (each row has 16) = 14.25), next value is the start of free space

pd_higher:
2 bytes - clicking on first byte -> data inspector -> int16 -> value is 296.
296 gives value for end of free space area -> 296/16(each row in hex editor has 16 cols) = 18.5
counting down from begining of block to 18.5, we will find the end of free space.

##### ItemIdData

4 bytes per item. array of identifiers pointing to actual items.
There are multiple of these after the page header.

how data is stored:
click on start of 4 bytes, then go to the next byte (2nd of 4 bytes).
Data Inspector -> look at 8 bit binary eg. 10110100
look at the 2nd digit of the 8bit binary.
find binary to decimal converter: 0110100
then go back and copy the entire 8 bit binary 10110100

so in our example, concat 0110100 + 10110100 and convert to decimal = eg. 296
this will give you a decimal number which is the number of bytes from the start of the page to the first item.
296 / 16 = 18.5 rows. and that will be the start of the first item.

##### Freespace - unlocated space.

##### Items - actual items themselves.

to calculate length of data. click on 3rd byte of 4 the bytes. look at int16 value. eg. 172
length of first item is 172.

68.6.1 Table row layout - And item is further made up of a fixed-size header (23 bytes), followed by optional data, then is the actual user data.
the pointer to the first value -> data inspector -> Int16 -> eg. 203 is the actual data is the id of the data in the postgreSQL table.

---
