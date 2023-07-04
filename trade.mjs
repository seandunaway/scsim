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
        if (state.trades[i] + up_target <= object.c) {
            state.up++
            state.resolved++
            state.trades.splice(i, 1)
        }
        else if (state.trades[i] - down_target >= object.c) {
            state.down++
            state.resolved++
            state.trades.splice(i, 1)
        }
    }
}

export function trade_summary(state) {
    state.unresolved = state.trades.length
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
