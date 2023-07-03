import * as trade from '../trade.mjs'

export let enabled = true
export let name = 'trade 1r, 100p targets, 2020 only'

let state = trade.new_state()

export function pre() {
}

export function tick(object) {
    trade.trade_targets(state, object, 100, 100)

    // enter
    if (object.t < new Date('2020').getTime() || object.t > new Date('2021').getTime()) return
    if (object.c % 1 !== 0) return  // every 1p

    state.trades.push(object.c)
}

export function debug() {
}

export function post() {
    return trade.trade_summary(state)
}
