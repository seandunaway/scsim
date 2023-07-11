export let enabled = false
export let name = 'ticks'

let last_price = 0
export function tick(object) {
    if (object.c === last_price) write('=')
    else if (object.c > last_price) write('+')
    else if (object.c < last_price) write('-')
    else throw new Error()

    last_price = object.c
}

function write(char) {
    process.stdout.write(char)
}
