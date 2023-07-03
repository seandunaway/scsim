export let enabled = true
export let name = 'trade 1r, 5p targets, every 5p'

let trades = []

let up_target = 5
let down_target = 5

let up = 0
let down = 0

let resolved = 0
let unresolved = 0
let percent = 0

export function pre() {
}

export function tick(object) {
    // look for winning trades
    for (let i = 0; i < trades.length; i++) {
        if (trades[i] === undefined) continue

        if (trades[i] + up_target <= object.c) {
            up++
            trades[i] = undefined
        }
        else if (trades[i] - down_target >= object.c) {
            down++
            trades[i] = undefined
        }
    }

    if (object.c % 5 !== 0) return  // every 5p only
    if (trades.includes(object.c)) return   // no duplicate trades

    trades.push(object.c)
}

export function debug() {
}

export function post() {
    for (let trade of trades) {
        if (trade === undefined) resolved++
        else unresolved++
    }

    if (up && down)
        percent = up / resolved

    return {up, down, percent, resolved, unresolved, total_trades: trades.length}
}

