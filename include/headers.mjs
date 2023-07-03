export let enabled = true
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

export function tick(object) {
}

export function debug() {
}

export function post() {
}
