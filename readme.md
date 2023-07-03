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
trade 1r, 50p targets, every 5p {
  up: 4702,
  down: 4128,
  resolved: 8830,
  unresolved: 8,
  total_trades: 8838,
  percent: 0.5325028312570781
}
trade 1r, 5p targets, every 5p {
  up: 19369,
  down: 18507,
  resolved: 37876,
  unresolved: 0,
  total_trades: 37876,
  percent: 0.5113792375118809
}
time 81360
%
```

