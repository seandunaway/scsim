export let enabled = true
export let name = 'count'

let count = 0

export function pre() {
}

export function tick() {
    count++
}

export function debug() {
}

export function post() {
    return count
}
