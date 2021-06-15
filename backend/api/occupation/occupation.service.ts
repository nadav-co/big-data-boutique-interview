import { meetingService } from "../meeting/meeting.service"

const dbService = require('../../services/db.service')

interface Meeting {
    _id?: string,
    startDate: Date,
    endDate: Date,
    createdBy: string,
    desc: string,
}

export const occupationService = {
    save,
    query
}

async function query(year: string) {
    const collection = await dbService.getCollection('occupation')
    const occupationsByDate = await collection.findOne({ "year": +year }) || { "year": +year }
    return occupationsByDate
}

async function save(meetingToSAve: Meeting) {
    const meeting = { ...meetingToSAve, startDate: new Date(meetingToSAve.startDate), endDate: new Date(meetingToSAve.endDate) }
    return meeting._id ? await _update(meeting) : await _add(meeting)
}

async function _add(meeting: Meeting) {
    try {
        const collection = await dbService.getCollection('occupation')
        const occupationsByDate = await collection.findOne({ "year": meeting.startDate.getFullYear() }) || { year: meeting.startDate.getFullYear() }
        return CheckTimeAndSave(meeting, occupationsByDate, collection)
    } catch (err) {
        console.log(err);
        throw err
    }
}

async function _update(meeting: Meeting) {
    try {
        const collection = await dbService.getCollection('occupation')
        const oldOccupationsByDate = await collection.findOne({ "year": meeting.startDate.getFullYear() })
        const occupationsByDate = await _removeOccupiedHours(meeting._id, oldOccupationsByDate)
        return CheckTimeAndSave(meeting, occupationsByDate, collection)
    } catch (err) {
        console.log(err);
        throw err
    }
}

async function CheckTimeAndSave(meeting: Meeting, occupationsByDate: any, collection: any) {
    if (!_checkStartHours(meeting.startDate, occupationsByDate) || !_checkEndHours(meeting.endDate, occupationsByDate)) throw new Error('invalid time')
    const newOccupationsByDate = _addOccupiedHours(meeting, occupationsByDate)
    const res = await collection.replaceOne({ "year": meeting.startDate.getFullYear() }, newOccupationsByDate, { upsert: true })
    // if (!res.result.nModified) collection.insertOne({ ...newOccupationsByDate, "year": meeting.startDate.getFullYear() })
    return
}

function _addOccupiedHours(meeting: Meeting, occupationsByDate: any) {
    const start = meeting.startDate
    const end = meeting.endDate

    const occHours = new Array(end.getHours() - start.getHours()).fill('').map((a, idx) => start.getHours() + idx)
    const date = `${start.getMonth()}-${start.getDate()}`

    const occupations = occupationsByDate[date] ? [...occupationsByDate[date], ...occHours] : [...occHours]

    return { ...occupationsByDate, [date]: occupations }
}

async function _removeOccupiedHours(id: any, occupationsByDate: any) {
    const meeting = await meetingService.getById(id)
    const start = new Date(meeting.startDate)
    const end = new Date(meeting.endDate)

    const occHours = new Array(end.getHours() - start.getHours()).fill('').map((a, idx) => start.getHours() + idx)
    const date = `${start.getMonth()}-${start.getDate()}`

    const occupations = occupationsByDate[date].filter((hour: number) => !occHours.includes(hour))
    return { ...occupationsByDate, [date]: occupations }
}

const _checkStartHours = (time: Date, occupationsByDate: any) => {
    const hour = time.getHours()
    return (_isWorkHours(hour)) && _isOccHours(occupationsByDate, time, hour)

}

const _checkEndHours = (time: Date, occupationsByDate: any) => {
    const hour = time.getHours()
    return (_isWorkHours(hour)) && _isOccHours(occupationsByDate, time, hour, 1)
}

const _isWorkHours = (hour: number) => {
    return (hour < 9 || hour > 18) ? false : true
}

const _isOccHours = (occupationsByDate: any, time: Date, hour: number, diff: number = 0) => {
    return (occupationsByDate[`${time.getMonth()}-${time.getDate()}`]?.includes(hour - diff)) ? false : true
}
