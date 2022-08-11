import { ObjectId } from 'mongodb'
import { db } from '.'

export type ComponentType = 'Base' | 'FrontLeft' | 'FrontCenter' | 'FrontRight' | 'BackName' | 'BackNumber'

const coll = db.collection<Component>('component')

export default class Component {
    _id: ObjectId
    name: string
    type: ComponentType
    path: string

    constructor(component: any) {
        this._id = new ObjectId()
        this.name = component.name
        this.type = component.type
        this.path = component.path
    }

    async insert() {
        await coll.insertOne(this)
    }

    async update(id: string) {
        await coll.updateOne(
            { _id: new ObjectId(id) },
            { $set: this },
        )
    }

    static find(type: ComponentType, limit: number = 0) {
        return coll.find({ type }).limit(limit).toArray()
    }

    static findOne(id: string) {
        return coll.findOne({ _id: new ObjectId(id) })
    }

    static async delete(id: string) {
        await coll.deleteOne({ _id: new ObjectId(id) })
    }
}
