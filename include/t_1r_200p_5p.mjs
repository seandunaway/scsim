import {new_state, trade_summary} from '../utility.mjs'

export let enabled = true
export let name = 'trade 1r, 200p targets, every 5p'

let state = new_state()

export function pre() {
}

export function tick(object) {
    // check winning targets
    for (let i = 0; i < state.trades.length; i++) {
        if (state.trades[i] === undefined) continue

        if (state.trades[i] + 200 <= object.c) {
            state.up++
            state.trades[i] = undefined
        }
        else if (state.trades[i] - 200 >= object.c) {
            state.down++
            state.trades[i] = undefined
        }
    }

    // new trade criteria
    if (object.c % 5 !== 0) return  // every 5p only
    if (state.trades.includes(object.c)) return   // no duplicate trades
    state.trades.push(object.c)
}

export function debug() {
}

export function post() {
    return trade_summary(state)
}
