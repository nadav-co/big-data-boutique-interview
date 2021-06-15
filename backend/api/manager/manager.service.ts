const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId


export const managerService = {
    query,
    getById,
    update,
    save
}

async function query() {
    try {
        const collection = await dbService.getCollection('manager')
        var managers = await collection.find().toArray() 
        return managers
    } catch (err) {
        throw err
    }

}

async function getById(id: string) {
    try {
        const collection = await dbService.getCollection('manager')
        const manager = await collection.findOne({ _id: ObjectId(id) })
        
        return manager
    } catch (err) {
        console.log(err);
        throw err
    }

}

async function save(managerToSave: any) {
    try {
        const collection = await dbService.getCollection('manager')
        const manager =  await collection.insertOne({...managerToSave})
        return manager.ops[0]
    } catch (err) {
        throw err
    }
}
async function update(manager: any) {
    try {
        manager._id = ObjectId(manager._id);
        const collection = await dbService.getCollection('manager')
        await collection.updateOne({ "_id": ObjectId(manager._id) }, { $set: manager })
        return manager
    } catch (err) {
        throw err
    }
}
