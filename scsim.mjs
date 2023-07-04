#!/usr/bin/env node

import {readdirSync} from 'node:fs'
import {pipeline} from 'node:stream'

let handlers = []
let filenames = readdirSync('./include/')
for (let filename of filenames) {
    if (! filename.endsWith('.mjs')) continue
    let module = await import(`./include/${filename}`)
    if (! module.enabled) continue
    handlers.push(module)
}

process.stdin.setEncoding('ascii')
process.stdout.setDefaultEncoding('ascii')

pipeline(
    process.stdin,
    hijack,
    process.stdout,
    function (error) {
        if (error) throw error
    }
)

async function *hijack(source) {
    handle('pre')

    let leftovers = ''
    let lines_processed = 0
    for await (let chunk of source) {
        let text = leftovers + chunk
        let lines = text.split('\n')
        leftovers = lines.pop() ?? ''

        for (let line of lines) {
            lines_processed++

            let object
            try {
                object = JSON.parse(line)
            } catch (error) {
                console.error(`line ${lines_processed}: ${error.message}`)
                continue
            }

            handle('tick', object)
        }
    }

    handle('post')
}

function handle(hook, ...params) {
    for (let handler of handlers) {
        if (typeof handler[hook] !== 'function') continue

        let result = handler[hook](...params)

        if (result !== undefined)
            console.log(`\x1b[7m${handler.name}\x1b[0m`, result)
    }
}
