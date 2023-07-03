import * as sim from '../utility.mjs'

export let enabled = true
export let name = 'trade 1r, 200p targets'

let state = sim.new_state()
let rules = sim.new_rules({
    up_target: 200,
    down_target: 200,
})

export function pre() {
}

export function tick(object) {
    sim.trade_check(state, rules, object)

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
