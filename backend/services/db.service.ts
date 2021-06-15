const MongoClient = require('mongodb').MongoClient

var dbURL: string
(process.env.NODE_ENV === 'production') ? dbURL = 'mongodb+srv://theUser:thePass@cluster0-klgzh.mongodb.net/test?retryWrites=true&w=majority' : dbURL = 'mongodb://localhost:27017'

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




