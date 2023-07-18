import * as trade from '../trade.mjs'

export let enabled = true
export let name = 'default'

let state = trade.state()

export function enter(object) {
    if (state.trades.includes(object.c)) return // no duplicates
    state.trades.push(object.c)
}

export function exit(object) {
    for (let i = 0; i < state.trades.length; i++) {
        if (object.c >= state.trades[i] + state.up_target) {
            state.up++
            state.trades.splice(i, 1)
        }
        if (object.c <= state.trades[i] - state.down_target) {
            state.down++
            state.trades.splice(i, 1)
        }
    }
}

export function post() {
    return trade.summary(state)
}
