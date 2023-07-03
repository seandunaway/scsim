export function new_state(overrides) {
    let state = {
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

export function trade_summary(state) {
    for (let trade of state.trades) {
        if (trade === undefined) state.resolved++
        else state.unresolved++
    }

    state.total_trades = state.trades.length
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
