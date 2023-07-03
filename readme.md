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
