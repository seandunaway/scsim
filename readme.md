# scsim

> iterate over historical data and pass each tick to handlers


usage: `./scsim.mjs < ES.test.jsonl > results.txt`

stdin: [sierrachart line separated json](http://github.com/seandunaway/scsv2sjsonl)

stdout: terminal or file


## handlers template
```js
export let enabled = true
export let name = 'name'

export function pre() {
}

export function tick(object) {
}

export function debug(object) {
}

export function post() {
}
```
function return values are written to stdout


## results
```shell
% ./scsim.mjs < ES.1m.jsonl
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
trade 1r, 100p targets {
  up: 2881,
  down: 2244,
  resolved: 5125,
  unresolved: 17,
  total_trades: 5142,
  percent: 0.5621463414634147
}
trade 1r, 100p targets, 2017-2018 {
  up: 1460,
  down: 1172,
  resolved: 2632,
  unresolved: 0,
  total_trades: 2632,
  percent: 0.5547112462006079
}
trade 1r, 100p targets, 2017 {
  up: 456,
  down: 0,
  resolved: 456,
  unresolved: 0,
  total_trades: 456,
  percent: 1
}
trade 1r, 100p targets, 2018 {
  up: 1027,
  down: 1172,
  resolved: 2199,
  unresolved: 0,
  total_trades: 2199,
  percent: 0.4670304683947249
}
trade 1r, 100p targets, 2020-2023 {
  up: 1796,
  down: 1625,
  resolved: 3421,
  unresolved: 0,
  total_trades: 3421,
  percent: 0.5249926921952646
}
trade 1r, 100p targets, 2020, dupes {
  up: 56242,
  down: 30931,
  resolved: 87173,
  unresolved: 0,
  total_trades: 87173,
  percent: 0.6451768322760488
}
trade 1r, 200p targets {
  up: 1674,
  down: 1061,
  resolved: 2735,
  unresolved: 35,
  total_trades: 2770,
  percent: 0.6120658135283363
}
trade 1r, 400p targets {
  up: 1050,
  down: 463,
  resolved: 1513,
  unresolved: 75,
  total_trades: 1588,
  percent: 0.6939854593522803
}
trade 1r, 50p targets {
  up: 4700,
  down: 4128,
  resolved: 8828,
  unresolved: 8,
  total_trades: 8836,
  percent: 0.5323969188944269
}
trade 1r, 5p targets {
  up: 19369,
  down: 18507,
  resolved: 37876,
  unresolved: 0,
  total_trades: 37876,
  percent: 0.5113792375118809
}
time 17578
%
```


## todo
- boolean functions for filter, enter, exit
- multiprocessor
- add strategies
