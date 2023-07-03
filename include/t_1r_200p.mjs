import * as trade from '../trade.mjs'

export let enabled = true
export let name = 'trade 1r, 200p targets'

let state = trade.new_state()

export function pre() {
}

export function tick(object) {
    trade.trade_targets(state, object, 200, 200)

    // enter
    if (object.c % 5 !== 0) return  // every 5p
    if (state.trades.includes(object.c)) return   // no duplicates
    state.trades.push(object.c)
}

export function debug() {
}

export function post() {
    return trade.trade_summary(state)
}
