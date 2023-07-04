import * as trade from '../trade.mjs'

export let enabled = true
export let name = 'martingale short, 1r 20p lmt 5'

let state = trade.state()

let target = 20
let stop = 20
let martingale_max = 5
let in_a_trade = false

export function tick(object) {
    if (in_a_trade) {
        manage_long(object)
    }
    else {
        enter_long(object)
    }
}

function manage_long(object) {
    /* RISK */
    // if price is stop pts above my *last* entry
    let stop_price = state.trades[state.trades.length - 1] + stop
    if (object.c >= stop_price) {

        // and we haven't martingaled martingale_max times yet
        if (state.trades.length < martingale_max) {

            // add risk!
            state.trades.push(stop_price)
            return
        }

        // if we've hit our max martingale count
        // all open trades are losers
        state.down += state.trades.length
        state.trades = []
        in_a_trade = false
    }

    /* REWARD */
    // if price is target pts above my *first* entry {
    if (object.c <= state.trades[0] - target) {
        // exit all trades as winners
        state.up += state.trades.length
        state.trades = []
        in_a_trade = false
    }
}

function enter_long(object) {
    if (object.t < new Date('2020').getTime() || object.t > new Date('2023').getTime()) return
    if (object.c % 1 !== 0) return
    if (in_a_trade) return

    state.trades.push(object.c)
    in_a_trade = true
}

export function post() {
    return trade.summary(state)
}
