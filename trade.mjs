export function state(overrides) {
    let state = {
        trades: [],
        up: 0,
        down: 0,
        ...overrides,
    }
    return state
}

export function targets(state, object, up_target = 5, down_target = 5) {
    for (let i = 0; i < state.trades.length; i++) {
        if (state.trades[i] + up_target <= object.c) {
            state.up++
            state.trades.splice(i, 1)
        }
        if (state.trades[i] - down_target >= object.c) {
            state.down++
            state.trades.splice(i, 1)
        }
    }
}

export function summary(state) {
    let summary = {...state}
    summary.resolved = summary.up + summary.down
    summary.unresolved = summary.trades.length
    summary.total_trades = summary.resolved + summary.unresolved
    summary.percent = summary.up / summary.resolved
    delete summary.trades
    return summary
}
