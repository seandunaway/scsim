import * as trade from '../trade.mjs'

export let enabled = true
export let name = 'trade'

let state = trade.state()

export function enter(object) {
    if (object.c % 5 !== 0) return // every 5p
    if (state.trades.includes(object.c)) return // no duplicates
    state.trades.push(object.c)
}

export function exit(object) {
    trade.targets(state, object)
}

export function post() {
    return trade.summary(state)
}
