const MongoClient = require('mongodb').MongoClient

var dbURL: string
(process.env.NODE_ENV === 'production') ? dbURL = 'mongodb+srv://nadav:b3NyL28eIa6QifCD@cluster0.yfzqr.mongodb.net/BIGDATA_BOUTIQUE?retryWrites=true&w=majority' : dbURL = 'mongodb://localhost:27017'

module.exports = {
    getCollection
}

// Database Name
const dbName = (process.env.NODE_ENV === 'production') ? 'BIGDATA_BOUTIQUE' : 'INTERVIEW'

var dbConn: any = null

async function getCollection(collectionName: string) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db(dbName)
        dbConn = db
        return db
    } catch (err) {
        throw err
    }
}




