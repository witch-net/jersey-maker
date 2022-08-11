import { Db, MongoClient } from 'mongodb'
import { config } from '../config'

export let db: Db

export function initDb() {
    const client = new MongoClient(config.databaseURL)
    db = client.db('jersey_maker')
}
