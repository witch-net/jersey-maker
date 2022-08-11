import { readFile } from 'node:fs/promises'

interface Config {
    address: string
    port: number
    databaseURL: string
    // sessionSecret: string | string[]
}

export let config: Config

export async function readConfig(path: string) {
    config = JSON.parse((await readFile(path)).toString())
    config.address = config.address ?? '127.0.0.1'
    config.port = config.port ?? 8080
    if ((config.databaseURL ?? '') === '') {
        throw new Error('no database URI specified')
    }
}
