export let enabled = true
export let name = 'time'

let time

export function pre() {
    time = Date.now()
}

export function post() {
    return Date.now() - time
}
