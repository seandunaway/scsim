import {new_state, trade_check, trade_summary} from '../utility.mjs'

export let enabled = true
export let name = 'trade 1r, 5p targets, every 5p'

let state = new_state({
    up_target: 5,
    down_target: 5,
})

export function pre() {
}

export function tick(object) {
    trade_check(state, object)

    if (object.c % 5 !== 0) return  // every 5p only
    if (state.trades.includes(object.c)) return   // no duplicate trades

    state.trades.push(object.c)
}

export function debug() {
}

export function post() {
    return trade_summary(state)
}

