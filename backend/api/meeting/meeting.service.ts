import { occupationService } from "../occupation/occupation.service"

const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId


export const meetingService = {
    query,
    getById,
    update,
    save
}

async function query(month: string, year: string) {
    try {
        const collection = await dbService.getCollection('meeting')
        const regex = `^${year}-${month.padStart(2, '0')}`
        var meetings = await collection.find({ 'startDate': { $regex: regex } }).toArray() 
        return meetings
    } catch (err) {
        throw err
    }

}

async function getById(id: string) {
    try {
        const collection = await dbService.getCollection('meeting')
        const meeting = await collection.findOne({ _id: ObjectId(id) })
        
        return meeting
    } catch (err) {
        console.log(err);
        throw err
    }

}

async function save(meetingToSave: any) {
    try {
        await occupationService.save(meetingToSave)
        const collection = await dbService.getCollection('meeting')
        const meeting =  await collection.insertOne({...meetingToSave})
        return meeting.ops[0]
    } catch (err) {
        throw err
    }
}
async function update(meeting: any) {
    try {
        await occupationService.save(meeting)
        meeting._id = ObjectId(meeting._id);
        const collection = await dbService.getCollection('meeting')
        await collection.updateOne({ "_id": ObjectId(meeting._id) }, { $set: meeting })
        return meeting
    } catch (err) {
        throw err
    }
}
