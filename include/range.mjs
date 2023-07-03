export let enabled = true
export let name = 'range'

let low = {}
let high = {}

export function pre() {
}

export function tick(object) {
    for (let key in object) {
        if (! low[key] || low[key] > object[key]) low[key] = object[key]
        if (! high[key] || high[key] < object[key]) high[key] = object[key]
    }
}

export function debug() {
}

export function post() {
    let low_datetime = new Date(low.t)
    let high_datetime = new Date(high.t)
    return {low_datetime, low, high_datetime, high}
}
