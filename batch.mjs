#!/usr/bin/env node

import {exec} from 'node:child_process'

let handlers = 'default'
let date_start = `''`
let date_stop = `''`
let filename = './ES.1m.jsonl'

let targets = [1, 2, 5, 10, 20, 40, 50, 60, 80, 100, 200, 400, 600, 800, 1000]
let promises = []
let outputs = []

for (let up_target of targets) {
    for (let down_target of targets) {
        let command = `./scsim.mjs ${handlers} ${date_start} ${date_stop} ${up_target} ${down_target} < ${filename}`
        console.info(command)

        let promise = new Promise(function (resolve, reject) {
            exec(command, function (err, stdout, stderr) {
                if (err) reject(err)
                outputs.push(stdout)
                resolve(true)
            })
        })
        promises.push(promise)
    }
}

await Promise.all(promises)

let regex = /{.+?up: (?<up>.+?),.+?up_target: (?<up_target>.+?),.+?down_target: (?<down_target>.+?),.+?edge: (?<edge>.+?)\n}/s
let table = []
for (let output of outputs) {
    let match = output.match(regex)
    table.push(match.groups)
}
table.sort(function (a, b) {
    return b.edge - a.edge
})
console.table(table)
