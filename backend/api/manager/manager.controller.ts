import { managerService } from './manager.service'
import { Request, Response } from "express";

async function getManagers(req: Request, res: Response) {
    try {
        const managers = await managerService.query()
        res.send(managers)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get managers' })
    }
}

async function getManager(req: Request, res: Response) {
    try {
        const manager = await managerService.getById(req.params.id)
        res.send(manager)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get manager' })
    }
}


async function saveManager(req: Request, res: Response) {
    try {
        const manager = req.body
        const savedManager = await managerService.save(manager)
        res.send(savedManager)

    } catch (err) {
        res.status(500).send({ err: 'Failed update add manager' })
    }
}

async function updateManager(req: Request, res: Response) {
    try {
        const manager = req.body
        const savedManager = await managerService.update(manager)
        res.send(savedManager)

    } catch (err) {
        res.status(500).send({ err: 'Failed update add manager' })
    }
}

module.exports = {
    getManager,
    getManagers,
    updateManager,
    saveManager
}