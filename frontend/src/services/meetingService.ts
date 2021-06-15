import { Meeting } from '../interfaces/entities'
import { httpService } from './httpService';
export const meetingService = {
    query,
    getById,
    getEmptyMeeting,
    updateMeeting,
    addMeeting,
    getOccupations
}

async function query(date: string): Promise<Meeting[]> {
    try {
        const meetings = await httpService.get(`meeting/${date}`)
        return meetings
    } catch (err) {
        console.log(err);
        throw err
    }
}
async function getById(id: string): Promise<Meeting> {
    try {
        const meeting = await httpService.get(`meeting/${id}`)
        return meeting
    } catch (err) {
        console.log(err);
        throw err
    }
}

function getEmptyMeeting(): Meeting {
    return {
        startDate: new Date(),
        endDate: null,
        createdBy: '',
        desc: '',
    }
}

async function updateMeeting(meeting: Meeting) {
    try {
        const newMeeting = await httpService.put(`meeting/${meeting._id}`, meeting)
        return newMeeting
    } catch (err) {
        console.log(err);
        throw err
    }
}
async function addMeeting(meeting: Meeting) {
    try {
        const newMeeting = await httpService.post(`meeting`, meeting)
        return newMeeting
    } catch (err) {
        console.log(err);
        throw err
    }
}

async function getOccupations(year: string | number) {
    try {
        const occupations = await httpService.get(`occupation/${year}`)
        return occupations
    } catch (err) {
        console.log(err);
        throw err
    }
}