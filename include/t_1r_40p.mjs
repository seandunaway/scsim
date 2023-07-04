import * as trade from '../trade.mjs'

export let enabled = true
export let name = 'trade 1r, 40p targets'

let state = trade.state({
    up_target: 40,
    down_target: 40,
})

export function tick(object) {
    trade.targets(state, object)

    // enter
    if (object.c % 5 !== 0) return  // every 5p
    if (state.trades.includes(object.c)) return   // no duplicates
    state.trades.push(object.c)
}

export function post() {
    return trade.summary(state)
}
