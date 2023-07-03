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

export function new_rules(overrides) {
    let rules = {
        up_target: undefined,
        down_target: undefined,
        start_timestamp: undefined,
        stop_timestamp: undefined,
        max_duration: undefined,
        bid_volume: undefined,
        ask_volume: undefined,
        flat_eod: false,
        ...overrides,
    }
    return rules
}

export function trade_check(state, rules, object) {
    for (let i = 0; i < state.trades.length; i++) {
        if (state.trades[i] === undefined) continue

        if (state.trades[i] + rules.up_target <= object.c) {
            state.up++
            state.trades[i] = undefined
        }
        else if (state.trades[i] - rules.down_target >= object.c) {
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
