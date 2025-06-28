###### <div style="text-align:right">[table of contents](#table-of-contents)</div>

## section 13 - PostgreSQL complex Datatypes

### Data types

#### most used:

##### Numbers

- Numbers without any decimal points: (smallint, integer, bigint)
- No decimal point, auto increment: (smallserial, serial, bigserial)
- Number with decimal points: (decimal, numeric, real, double precision, float)

(RULES):

- SERIAL - id column on any table
- INTEGER - store number without decimal
- NUMERIC - store number with decimal - data needs to be accurate (bank balance, scientific calculations)
- DOUBLE PRECISION - store number with decimal - data doesnt need to be accurate (floating point math - eg. calculations result in something like 1.001358e-05)

##### Character

No performance benefits between types

- CHAR(4) - store some characters, length will always be 4 even if postgres has to add spaces
- VARCHAR(40) - store a string up to 40 chars, automatically remove extra chars
- VARCHAR - store any length of string
- TEXT - Store any lenght of string

##### Boolean

- TRUE ('true', 'yes', 'on', 1, 't', 'y')
- FALSE ('false', 'no', 'off', 0, 'f', 'n')
- NULL (null)

##### Date

Can provide string in almost any format and postgres will do conversion
can specify something to be date by explicitly giving a data type with '::DATE'

###### date_trunc('week')

pulls out from date property and rounds down to nearest week

```SQL
SELECT('NOV 20 1980'::DATE);
```

- 1980-11-20 -> 1980-11-20
- NOV-20-1980 -> 1980-11-20
- 20-Nov-1980 -> 1980-11-20
- 1980-November-20 -> 1980-11-20
- November 20, 1980 -> 1980-11-20\

##### Time

- TIME or TIME WITHOUT TIME ZONE
- TIME WITH TIME ZONE (converts to UCT time)
- TIMESTAMP WITH TIME ZONE

```SQL
  SELECT('01:23 AM'::TIME)
  --13:23:00

  SELECT('01:23 AM EST'::TIME WITH TIME ZONE)
  --converted to 01:23-05:00 (the -05 means 5 hours behind UCT time)

  SELECT('Nov-20-1980 05:23PM PST'::TIMESTAMP WITH TIME ZONE)
  --converted to 1980-11-20 02:23:00-07 (date, time, UCT offset)

```

##### Interval

Can do math calculations on intervals.
Can mix INTERVAL with other TIME types.
Think of interval as a duration of time

- 1 day
- 1 D
- 1 D 1 M 1 S

```SQL
SELECT ('1 D 20 H 30 M 45 S'::INTERVAL) - ('1 D'::INTERVAL)
  --result is 20:30:45
```

#### other:

- Currency
- arrays
- geometric
- range
- xml
- binary
- json
- UUID

---
