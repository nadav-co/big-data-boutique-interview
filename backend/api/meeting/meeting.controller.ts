import { meetingService } from './meeting.service'
import { Request, Response } from "express";

async function getMeetings(req: Request, res: Response) {
    
    const { month, year } = req.params
    try {
        const meetings = await meetingService.query(month, year)
        res.send(meetings)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get meetings' })
    }
}
async function getOccupations(req: Request, res: Response) {
    const { month, year } = req.params
    try {
        const occupations = await meetingService.getOccupations(month, year)
        res.send(occupations)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get occupations' })
    }
}

async function getMeeting(req: Request, res: Response) {
    try {
        const meeting = await meetingService.getById(req.params.id)
        res.send(meeting)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get meeting' })
    }
}


async function saveMeeting(req: Request, res: Response) {
    try {
        const meeting = req.body
        const savedMeeting = await meetingService.save(meeting)
        res.send(savedMeeting)

    } catch (err) {
        res.status(500).send({ err: 'Failed save add meeting' })
    }
}

async function updateMeeting(req: Request, res: Response) {
    
    try {
        const meeting = req.body
        const savedMeeting = await meetingService.update(meeting)
        res.send(savedMeeting)

    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    getMeetings,
    getMeeting,
    updateMeeting,
    saveMeeting,
    getOccupations
}