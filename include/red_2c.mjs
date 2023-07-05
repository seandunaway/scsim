import * as trade from '../trade.mjs'

export let enabled = true
export let name = 'buy on 2% red day'

let state = trade.state()

let in_a_trade = false
let daily_open

export function enter(object) {
    if (in_a_trade) return

    // update daily open price
    let date = new Date(object.t)
    let hour = date.getHours()
    let minute = date.getMinutes()
    if (hour === 6 && minute === 30) {
        daily_open = object.c
    }

    if (! daily_open) return

    // enter if down 2% on the day
    let entry_price = daily_open - (daily_open * 0.02)
    if (object.c <= entry_price) {
        state.trades.push(object.c)
        in_a_trade = true
    }
}

export function exit(object) {
    if (object.c <= state.trades[0] - state.down_target) {
        state.down++
        state.trades = []
        in_a_trade = false
    }
    if (object.c >= state.trades[0] + state.up_target) {
        state.up++
        state.trades = []
        in_a_trade = false
    }
}

export function post() {
    return trade.summary(state)
}
