export let enabled = true
export let name = 'count'

let count = 0

export function tick() {
    count++
}

export function post() {
    return count
}
