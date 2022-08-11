import cookieParser from 'cookie-parser'
import express from 'express'
import process from 'node:process'
import { config, readConfig } from './config'

(async function () {
    const configPath = process.argv[2]
    if (configPath === undefined) {
        throw new Error('no config file specified')
    } else {
        await readConfig(configPath)
    }

    const app = express()
    app.use(express.json())
    app.use(cookieParser());
    (await import('./models')).initDb();
    (await import('./routes')).initRoutes(app)
    app.listen(config.port, config.address, () => {
        console.log(`Server is running at http://${config.address}:${config.port}`)
    })
})()
