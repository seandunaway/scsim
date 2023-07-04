export function state(overrides) {
    let state = {
        up_target: 10,
        down_target: 10,

        trades: [],
        up: 0,
        down: 0,

        ...overrides,
    }
    return state
}

export function targets(state, object) {
    for (let i = 0; i < state.trades.length; i++) {
        if (state.trades[i] + state.up_target <= object.c) {
            state.up++
            state.trades.splice(i, 1)
        }
        if (state.trades[i] - state.down_target >= object.c) {
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

    summary.breakeven = percent(1 - (summary.up_target / (summary.up_target + summary.down_target)))
    summary.percent = percent(summary.up / summary.resolved)
    summary.edge = percent(summary.percent - summary.breakeven)

    delete summary.trades
    return summary
}

export function percent(float) {
    return Math.round((float + Number.EPSILON) * 100) / 100
}
