import { Manager } from "../interfaces/entities";
import { httpService } from "./httpService";

export const managerService = {
    query,
    addManager,
    updateManager
}


async function query(): Promise<Manager[]> {
    try {
        const managers = await httpService.get('manager')
        return managers
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
        const newManager = await httpService.post('manager', manager)
        return newManager
    } catch (err) {
        console.log(err);
        throw err
    }
}