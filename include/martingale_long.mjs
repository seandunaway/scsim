import * as trade from '../trade.mjs'

export let enabled = true
export let name = 'martingale long'

let state = trade.state({
    up_target: 20,
    down_target: 100,
})
state.martingale = state.up_target

let in_a_trade = false

export function enter(object) {
    if (in_a_trade) return
    if (object.c % 1 !== 0) return

    state.trades.push(object.c)
    in_a_trade = true
}

export function exit(object) {
    if (! in_a_trade) return

    // if price is up_target points above my first entry.. success!
    if (object.c >= state.trades[0] + state.up_target) {
        state.up += state.trades.length
        state.trades = []
        in_a_trade = false
        return
    }

    // if price is down_target points below my first entry.. game over!
    if (object.c <= state.trades[0] - state.down_target) {
        state.down += state.trades.length
        state.trades = []
        in_a_trade = false
        return
    }

    // if price is martingale points below my *last* entry.. martingale!
    let martingale_price = state.trades[state.trades.length - 1] - state.martingale
    if (object.c <= martingale_price) {
        state.trades.push(martingale_price)
        return
    }
}

export function post() {
    return trade.summary(state)
}
