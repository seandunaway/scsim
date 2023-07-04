export let enabled = true
export let name = 'nth'

let count = 0
let nth = 1_000_000

export function tick() {
    count++
    if (count % nth === 0) return count
}
