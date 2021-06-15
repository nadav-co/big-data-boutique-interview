import { occupationService } from './occupation.service'
import { Request, Response } from "express";

async function getOccupations(req: Request, res: Response) {
    const{month, year}  = req.params
    try {
        const occupations = await occupationService.query(year)
        res.send(occupations)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get occupations' })
    }
}
module.exports = {
    getOccupations,
}