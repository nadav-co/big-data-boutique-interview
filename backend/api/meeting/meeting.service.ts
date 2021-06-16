const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

export interface Meeting {
    _id?: string,
    startDate: Date,
    endDate: Date,
    createdBy: string,
    desc: string,
    occupationHours: number[],
    indexDate?: string
}

export const meetingService = {
    query,
    getById,
    update,
    save,
    getOccupations
}

async function query(month: string, year: string) {
    try {
        const collection = await dbService.getCollection('meeting')
        const date = `${year}-${+month - 1}`
        var meetings = await collection.find({ 'indexDate': date }).toArray()
        return meetings
    } catch (err) {
        throw err
    }

}

async function getOccupations(month: string, year: string) {
    try {
        const meetings = await query(month, year)
        const occupationsByDate: any = { month: +month - 1 }
        console.log(meetings);
        
        meetings.forEach((meeting: Meeting) => {
            const start = new Date(meeting.startDate)
            occupationsByDate[`${start.getMonth()}-${start.getDate()}`]?.push(...meeting.occupationHours) ||
            (occupationsByDate[`${start.getMonth()}-${start.getDate()}`] = meeting.occupationHours)
        })
        console.log(occupationsByDate);
        return occupationsByDate
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

async function save(meetingToSave: Meeting) {
    try {
        const newMeeting = await _checkAndModifyMeeting({...meetingToSave})
        const collection = await dbService.getCollection('meeting')
        const res = await collection.insertOne({ ...newMeeting })
        return res.ops[0]
    } catch (err) {
        throw err
    }
}
async function update(meetingToUpdate: Meeting) {
    try {
        const newMeeting = await _checkAndModifyMeeting({...meetingToUpdate})
        newMeeting._id = ObjectId(newMeeting._id);
        const collection = await dbService.getCollection('meeting')
        const res = await collection.replaceOne({ "_id": ObjectId(newMeeting._id) }, { $set: newMeeting })
        console.log(res);
        
        return newMeeting
    } catch (err) {
        throw err
    }
}

async function _checkAndModifyMeeting(meeting: Meeting) {
    const start = meeting.startDate = new Date(meeting.startDate)
    const end = meeting.endDate = new Date(meeting.endDate)
    const occupationHours = new Array(end.getHours() - start.getHours()).fill('').map((a, idx) => start.getHours() + idx)
    const occupationsByDate = await getOccupations(start.getMonth().toString(), start.getFullYear().toString())
    const oldMeeting = (meeting._id) ? await getById(meeting._id) : null
    occupationHours.forEach(hour => {
        if (occupationsByDate[`${start.getMonth()}-${start.getDate()}`]?.includes(hour) &&
            !oldMeeting?.occupationHours.includes(hour)) throw new Error('Invalid time')
        return
    })
    meeting.occupationHours = occupationHours
    meeting.indexDate = `${start.getFullYear()}-${start.getMonth()}`
    return { ...meeting }
}
