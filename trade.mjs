export function new_state(overrides) {
    let state = {
        trades: [],
        up: 0,
        down: 0,
        resolved: 0,
        unresolved: 0,
        ...overrides,
    }
    return state
}

export function trade_targets(state, object, up_target = 5, down_target = 5) {
    for (let i = 0; i < state.trades.length; i++) {
        if (state.trades[i] === undefined) continue

        if (state.trades[i] + up_target <= object.c) {
            state.up++
            state.trades[i] = undefined
        }
        else if (state.trades[i] - down_target >= object.c) {
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

    state.total_trades = state.resolved + state.unresolved
    state.percent = state.up / state.resolved

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
