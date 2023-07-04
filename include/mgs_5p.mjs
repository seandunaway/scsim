import * as trade from '../trade.mjs'

export let enabled = true
export let name = 'martingale short, reward 5, risk 5x5'

let state = trade.state({
    up_target: 25,
    down_target: 5,
    martingale: 5,
    short: true,
})

let in_a_trade = false

export function tick(object) {
    if (in_a_trade) {
        manage(object)
    }
    else {
        enter(object)
    }
}

function manage(object) {
    // if price is up_target points above my first entry.. game over!
    if (object.c >= state.trades[0] + state.up_target) {
        state.up += state.trades.length
        state.trades = []
        in_a_trade = false
        return
    }

    // if price is down_target points below my first entry.. success!
    if (object.c <= state.trades[0] - state.down_target) {
        state.down += state.trades.length
        state.trades = []
        in_a_trade = false
        return
    }

    // if price is martingale points below my *last* entry.. martingale!
    let martingale_price = state.trades[state.trades.length - 1] + state.martingale
    if (object.c >= martingale_price) {
        state.trades.push(martingale_price)
        return
    }
}

function enter(object) {
    if (object.t < new Date('2020').getTime() || object.t > new Date('2023').getTime()) return
    if (object.c % 1 !== 0) return

    if (in_a_trade) return

    state.trades.push(object.c)
    in_a_trade = true
}

export function post() {
    return trade.summary(state)
}
