#!/usr/bin/env node

// @todo attach stdin

import {exec} from 'node:child_process'

let targets = [1, 2, 5, 10, 20, 40, 50, 60, 80, 100, 200, 400, 600, 800, 1000]
let promises = []
let outputs = []

for (let up_target of targets) {
    for (let down_target of targets) {
        let command = `./scsim.mjs ${process.argv[2]} '' '' ${up_target} ${down_target} < ES.1m.jsonl`
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

let regex = /(?<handler>.+?) {.+?up_target: (?<up_target>.+?),.+?down_target: (?<down_target>.+?),.+?edge: (?<edge>.+?)\n}/s
for (let output of outputs) {
    let match = output.match(regex)
    console.log(`${match.groups.handler}: up: ${match.groups.up_target} down: ${match.groups.down_target} edge: ${match.groups.edge}`)
}
