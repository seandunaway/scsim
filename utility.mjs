export function new_state(overrides) {
    let state = {
        start_date: undefined,
        stop_date: undefined,
        up_target: 1,
        down_target: 1,

        trades: [],
        up: 0,
        down: 0,
        resolved: 0,
        unresolved: 0,
        total_trades: 0,
        percent: 0,

        ...overrides,
    }
    return state
}

export function trade_check(state, object) {
    for (let i = 0; i < state.trades.length; i++) {
        if (state.trades[i] === undefined) continue

        if (state.trades[i] + state.up_target <= object.c) {
            state.up++
            state.trades[i] = undefined
        }
        else if (state.trades[i] - state.down_target >= object.c) {
            state.down++
            state.trades[i] = undefined
        }
    }
}

export function trade_summary(state) {
    for (let trade of state.trades) {
        if (trade === undefined) state.resolved++
        else state.unresolved++
    }

    if (state.up && state.down)
        state.percent = state.up / state.resolved

    state.total_trends = state.trades.length

    let trade_summary = {
        up: state.up,
        down: state.down,
        resolved: state.resolved,
        unresolved: state.unresolved,
        total_trades: state.total_trades,
        percent: state.percent,
    }
    return trade_summary
}
