import * as sim from '../utility.mjs'

export let enabled = true
export let name = 'trade 1r, 100p targets'

let state = sim.new_state()

export function pre() {
}

export function tick(object) {
    sim.trade_targets(state, object, 100, 100)

    // enter
    if (object.c % 5 !== 0) return  // every 5p
    if (state.trades.includes(object.c)) return   // no duplicates
    state.trades.push(object.c)
}

export function debug() {
}

export function post() {
    return sim.trade_summary(state)
}
