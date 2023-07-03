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
    low.datetime = new Date(low.t)
    high.datetime = new Date(high.t)
    return {low, high}
}
