import process from 'node:process'

export function state(overrides) {
    let state = {
        trades: [],
        up: 0,
        down: 0,
        up_target: 20,
        down_target: 20,
        ...overrides,
    }

    // override the overrides
    if (process.argv[5]) state.up_target = Number(process.argv[5])
    if (process.argv[6]) state.down_target = Number(process.argv[6])

    return state
}

export function summary(state) {
    let summary = {...state}
    summary.resolved = summary.up + summary.down
    summary.unresolved = summary.trades.length
    summary.total_trades = summary.resolved + summary.unresolved

    summary.breakeven = percent(1 - (summary.up_target / (summary.up_target + summary.down_target)))
    summary.percent = percent(summary.up / summary.resolved)
    if (state.short) {
        summary.breakeven = 1 - summary.breakeven
        summary.percent = 1 - summary.percent
    }

    summary.edge = percent(summary.percent - summary.breakeven)

    delete summary.trades
    return summary
}

export function percent(float) {
    return Math.round((float + Number.EPSILON) * 100) / 100
}
