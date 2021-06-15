import { Manager } from "../interfaces/entities";
import { httpService } from "./httpService";

export const managerService = {
    query,
    getById,
    addManager,
    updateManager
}


async function query(): Promise<Manager[]> {
    try {
        const managers = await httpService.get(`manager`)
        return managers
    } catch (err) {
        console.log(err);
        throw err
    }
}
async function getById(id: string): Promise<Manager> {
    try {
        const manager = await httpService.get(`manager/${id}`)
        return manager
    } catch (err) {
        console.log(err);
        throw err
    }
}

async function updateManager(manager: Manager) {
    try {
        const newManager = await httpService.put(`manager/${manager._id}`, manager)
        return newManager
    } catch (err) {
        console.log(err);
        throw err
    }
}
async function addManager(manager: Manager) {
    try {
        const newManager = await httpService.post(`manager`, manager)
        return newManager
    } catch (err) {
        console.log(err);
        throw err
    }
}