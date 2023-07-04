import * as trade from '../trade.mjs'

export let enabled = true
export let name = 'trade 1r, 100p targets, 2017-2018'

let state = trade.new_state()

export function pre() {
}

export function tick(object) {
    trade.trade_targets(state, object, 100, 100)

    // enter
    if (object.t < new Date('2017').getTime() || object.t > new Date('2019').getTime()) return
    if (object.c % 1 !== 0) return  // every 1p
    if (state.trades.includes(object.c)) return   // no duplicates
    state.trades.push(object.c)
}

export function debug() {
}

export function post() {
    return trade.trade_summary(state)
}
