# scsim

> iterate over historical data and pass each tick to handlers


**usage**: `./scsim.mjs <regex> <start_date> <stop_date> <up_target> <down_target> < ES.test.jsonl`

**regex**: handler match e.g. `'(count|martingale)'`, omit for all

**start_date**, **stop_date**: any valid datetime string e.g. `'March 5 2020 6:30'`, omit for all

**up_target**, **down_target**: points to enter and exit trades, omit for strategy defaults

**stdin**: [sierrachart line separated json](http://github.com/seandunaway/scsv2sjsonl)

**stdout**: terminal or file


## handlers template
```js
export let enabled = true
export let name = 'name'
export function pre() {}
export function tick(object) {}
export function enter(object) {}
export function exit(object) {}
export function post() {}
```
function return values are written to stdout


## results
```js
% ./scsim.mjs < ~/Documents/sc_data/ES.1m.jsonl
headers {
  t: 'timestamp',
  o: 'open',
  h: 'high',
  l: 'low',
  c: 'close',
  v: 'volume',
  b: 'bidvolume',
  a: 'askvolume'
}
nth 1000000
nth 2000000
nth 3000000
nth 4000000
count 4344817
range {
  low_datetime: 2011-01-02T23:00:00.000Z,
  low: {
    t: 1294009200000,
    o: 1068.75,
    h: 1069.75,
    l: 1068,
    c: 1069,
    v: 1,
    n: 1,
    b: 1,
    a: 1
  },
  high_datetime: 2023-06-16T13:29:00.000Z,
  high: {
    t: 1686922140000,
    o: 4807,
    h: 4808.25,
    l: 4806.5,
    c: 4807.25,
    v: 192341,
    n: 49072,
    b: 110869,
    a: 99229
  },
  diff_days: 4547.603472222222
}
time 12455
martingale long {
  up: 2121,
  down: 1167,
  up_target: 20,
  down_target: 100,
  martingale: 20,
  resolved: 3288,
  unresolved: 0,
  total_trades: 3288,
  breakeven: 0.83,
  percent: 0.65,
  edge: -0.18
}
martingale short {
  up: 1309,
  down: 1850,
  up_target: 100,
  down_target: 20,
  short: true,
  martingale: 20,
  resolved: 3159,
  unresolved: 1,
  total_trades: 3160,
  breakeven: 0.83,
  percent: 0.5900000000000001,
  edge: -0.24
}
-2% long {
  up: 2150,
  down: 2021,
  up_target: 20,
  down_target: 20,
  resolved: 4171,
  unresolved: 0,
  total_trades: 4171,
  breakeven: 0.5,
  percent: 0.52,
  edge: 0.02
}
trade {
  up: 8616,
  down: 7958,
  up_target: 20,
  down_target: 20,
  resolved: 16574,
  unresolved: 2,
  total_trades: 16576,
  breakeven: 0.5,
  percent: 0.52,
  edge: 0.02
}
%
```
