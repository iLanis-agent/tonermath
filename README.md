# Toner Math

Printer cartridge, day, cost and time arithmetic. The 12500 pages at 3000 pages a cartridge make 5 cartridges, the last cartridge covering 500 pages.

## Named constants

None. Every number is the owner's own entry.

## What it computes

- **The cartridges truth** - the pages (1 to 1000000) divided by the pages a cartridge (1 to 100000), rounded up, with what the last cartridge covers.
- **The days truth** - the cartridge yield divided by the pages printed a day (1 to 100000), with the pages left for the next day.
- **The cost truth** - the cartridges (1 to 10000) times the cartridge price ($0.01 to $999.99) to the cent, and spread over the pages, half rounded up.
- **The time truth** - the pages divided by the pages a minute (1 to 1000), rounded up, in minutes and in hours and minutes.

## Boundary

Arithmetic only. Counting applied as written. It has not seen any printer, cartridge or power bill and does not know whether a cartridge will really reach its yield, a printer will jam or a price will hold, and it gives no verdict that a cartridge is worth its price or a printer is right for you. Every number is the owner's own entry.

## Files

- `index.html` - landing page with the boundary and starting examples.
- `app.html` - the calculator; every box recomputes on each keystroke.
- `engine.js` - the four truths, shared by the page and the tests.
- `oracle.py` - an independent Python re-implementation; writes `expected.json`.
- `test.js` - runs the engine against `expected.json` (99 cases, 20 error cases).

## Tests

```
python3 oracle.py
node test.js
```
