import type { Express } from 'express'
import Component, { ComponentType } from './models/Component'

export function initRoutes(app: Express) {
    app.get('/api/jersey/:id', async (req, res) => {
        const component = await Component.findOne(req.params['id'])
        if (component === null) {
            res.sendStatus(404)
            return
        }
        res.json(component)
    })
    app.get('/api/jersey', async (req, res) => {
        const components = await Component.find(req.query['type'] as ComponentType, Number(req.query['limit']))
        if (components.length === 0) {
            res.sendStatus(404)
            return
        }
        res.json(components)
    })
    app.post('/api/jersey', async (req, res) => {
        const component = new Component(req.body)
        await component.insert()
        res.sendStatus(201)
    })
    app.delete('/api/jersey/:id', async (req, res) => {
        await Component.delete(req.params['id'])
        res.sendStatus(204)
    })
    app.patch('/api/jersey/:id', async (req, res) => {
        const component = new Component(req.body)
        await component.update(req.params['id'])
        res.sendStatus(204)
    })
}
