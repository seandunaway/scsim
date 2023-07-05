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

export function pre() {
}

export function tick(object) {
}

export function post() {
}
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
time 27875
martingale long, reward 1, risk 1x5 {
  up: 92594,
  down: 62526,
  up_target: 1,
  down_target: 5,
  martingale: 1,
  resolved: 155120,
  unresolved: 0,
  total_trades: 155120,
  breakeven: 0.83,
  percent: 0.6,
  edge: -0.23
}
martingale long, reward 5, risk 5x5 {
  up: 14231,
  down: 9150,
  up_target: 5,
  down_target: 25,
  martingale: 5,
  resolved: 23381,
  unresolved: 0,
  total_trades: 23381,
  breakeven: 0.83,
  percent: 0.61,
  edge: -0.22
}
martingale long, reward 20, risk 20x5 {
  up: 1393,
  down: 847,
  up_target: 20,
  down_target: 100,
  martingale: 20,
  resolved: 2240,
  unresolved: 0,
  total_trades: 2240,
  breakeven: 0.83,
  percent: 0.62,
  edge: -0.21
}
martingale long, reward 40, risk 40x5 {
  up: 373,
  down: 189,
  up_target: 40,
  down_target: 200,
  martingale: 40,
  resolved: 562,
  unresolved: 0,
  total_trades: 562,
  breakeven: 0.83,
  percent: 0.66,
  edge: -0.17
}
martingale long, reward 100, risk 100x5 {
  up: 68,
  down: 30,
  up_target: 100,
  down_target: 500,
  martingale: 100,
  resolved: 98,
  unresolved: 0,
  total_trades: 98,
  breakeven: 0.83,
  percent: 0.69,
  edge: -0.14
}
martingale long, reward 200, risk 200x5 {
  up: 21,
  down: 10,
  up_target: 200,
  down_target: 1000,
  martingale: 200,
  resolved: 31,
  unresolved: 0,
  total_trades: 31,
  breakeven: 0.83,
  percent: 0.68,
  edge: -0.15
}
martingale short, reward 1, risk 1x5 {
  up: 65087,
  down: 90127,
  up_target: 5,
  down_target: 1,
  martingale: 1,
  short: true,
  resolved: 155214,
  unresolved: 0,
  total_trades: 155214,
  breakeven: 0.83,
  percent: 0.5800000000000001,
  edge: -0.25
}
martingale short, reward 5, risk 5x5 {
  up: 9458,
  down: 13755,
  up_target: 25,
  down_target: 5,
  martingale: 5,
  short: true,
  resolved: 23213,
  unresolved: 0,
  total_trades: 23213,
  breakeven: 0.83,
  percent: 0.5900000000000001,
  edge: -0.24
}
martingale short, reward 20, risk 20x5 {
  up: 854,
  down: 1285,
  up_target: 100,
  down_target: 20,
  martingale: 20,
  short: true,
  resolved: 2139,
  unresolved: 0,
  total_trades: 2139,
  breakeven: 0.83,
  percent: 0.6,
  edge: -0.23
}
martingale short, reward 40, risk 40x5 {
  up: 230,
  down: 346,
  up_target: 200,
  down_target: 40,
  martingale: 40,
  short: true,
  resolved: 576,
  unresolved: 0,
  total_trades: 576,
  breakeven: 0.83,
  percent: 0.6,
  edge: -0.23
}
martingale short, reward 100, risk 100x5 {
  up: 45,
  down: 57,
  up_target: 500,
  down_target: 100,
  martingale: 100,
  short: true,
  resolved: 102,
  unresolved: 0,
  total_trades: 102,
  breakeven: 0.83,
  percent: 0.56,
  edge: -0.27
}
martingale short, reward 200, risk 200x5 {
  up: 10,
  down: 15,
  up_target: 1000,
  down_target: 200,
  martingale: 200,
  short: true,
  resolved: 25,
  unresolved: 5,
  total_trades: 30,
  breakeven: 0.83,
  percent: 0.6,
  edge: -0.23
}
trade 1r, 1p targets {
  up: 43247,
  down: 42635,
  up_target: 1,
  down_target: 1,
  resolved: 85882,
  unresolved: 0,
  total_trades: 85882,
  breakeven: 0.5,
  percent: 0.5,
  edge: 0
}
trade 1r, 5p targets {
  up: 19369,
  down: 18507,
  up_target: 5,
  down_target: 5,
  resolved: 37876,
  unresolved: 0,
  total_trades: 37876,
  breakeven: 0.5,
  percent: 0.51,
  edge: 0.01
}
trade 1r, 20p targets {
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
trade 1r, 40p targets {
  up: 5479,
  down: 4847,
  up_target: 40,
  down_target: 40,
  resolved: 10326,
  unresolved: 6,
  total_trades: 10332,
  breakeven: 0.5,
  percent: 0.53,
  edge: 0.03
}
trade 1r, 50p targets {
  up: 4700,
  down: 4128,
  up_target: 50,
  down_target: 50,
  resolved: 8828,
  unresolved: 8,
  total_trades: 8836,
  breakeven: 0.5,
  percent: 0.53,
  edge: 0.03
}
trade 1r, 100p targets, 2017-2018 {
  up: 1460,
  down: 1172,
  up_target: 100,
  down_target: 100,
  resolved: 2632,
  unresolved: 0,
  total_trades: 2632,
  breakeven: 0.5,
  percent: 0.55,
  edge: 0.05
}
trade 1r, 100p targets, 2017 {
  up: 456,
  down: 0,
  up_target: 100,
  down_target: 100,
  resolved: 456,
  unresolved: 0,
  total_trades: 456,
  breakeven: 0.5,
  percent: 1,
  edge: 0.5
}
trade 1r, 100p targets, 2018 {
  up: 1027,
  down: 1172,
  up_target: 100,
  down_target: 100,
  resolved: 2199,
  unresolved: 0,
  total_trades: 2199,
  breakeven: 0.5,
  percent: 0.47,
  edge: -0.03
}
trade 1r, 100p targets, 2020-2023 {
  up: 1796,
  down: 1625,
  up_target: 100,
  down_target: 100,
  resolved: 3421,
  unresolved: 0,
  total_trades: 3421,
  breakeven: 0.5,
  percent: 0.52,
  edge: 0.02
}
trade 1r, 100p targets, 2020 {
  up: 3530,
  down: 2662,
  up_target: 100,
  down_target: 100,
  resolved: 6192,
  unresolved: 0,
  total_trades: 6192,
  breakeven: 0.5,
  percent: 0.57,
  edge: 0.07
}
trade 1r, 100p targets {
  up: 2881,
  down: 2244,
  up_target: 100,
  down_target: 100,
  resolved: 5125,
  unresolved: 17,
  total_trades: 5142,
  breakeven: 0.5,
  percent: 0.56,
  edge: 0.06
}
trade 1r, 200p targets {
  up: 1674,
  down: 1061,
  up_target: 200,
  down_target: 200,
  resolved: 2735,
  unresolved: 35,
  total_trades: 2770,
  breakeven: 0.5,
  percent: 0.61,
  edge: 0.11
}
trade 1r, 400p targets {
  up: 1050,
  down: 463,
  up_target: 400,
  down_target: 400,
  resolved: 1513,
  unresolved: 75,
  total_trades: 1588,
  breakeven: 0.5,
  percent: 0.69,
  edge: 0.19
}
%
```
