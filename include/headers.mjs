export let enabled = false
export let name = 'headers'

let headers = {
    t: 'timestamp',
    o: 'open',
    h: 'high',
    l: 'low',
    c: 'close',
    v: 'volume',
    b: 'bidvolume',
    a: 'askvolume',
}

export function pre() {
    return headers
}

export function tick() {
}

export function debug() {
}

export function post() {
}
