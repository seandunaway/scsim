export let enabled = true
export let name = 'time'

let time

export function pre() {
    time = Date.now()
}

export function tick() {
}

export function debug() {
}

export function post() {
    return Date.now() - time
}
