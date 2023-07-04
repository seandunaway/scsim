#!/usr/bin/env node

import {readdirSync} from 'node:fs'
import {pipeline} from 'node:stream'

let handler_regex = new RegExp(process.argv[2])
let timestamp_start = new Date(process.argv[3] || '1900').getTime()
let timestamp_stop = new Date(process.argv[4] || '2100').getTime()

let handlers = []
let filenames = readdirSync('./include/', {encoding: 'utf8', recursive: true})
let filenames_sort = filenames.sort(function (a, b) {
    return a.localeCompare(b, undefined, {numeric: true})
})
for (let filename of filenames_sort) {
    if (! filename.endsWith('.mjs')) continue
    let module = await import(`./include/${filename}`)
    if (! module.enabled) continue
    if (! handler_regex.test(filename)) continue
    handlers.push(module)
}
if (! handlers.length) process.exit()

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

            if (object.t < timestamp_start || object.t > timestamp_stop) continue

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
