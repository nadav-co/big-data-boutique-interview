import { Manager } from "../../interfaces/entities"
import { managerService } from "../../services/managerService"

export function getManagers() {
  return async (dispatch: any) => {
    try {
      const managers = await managerService.query()
      dispatch({ type: 'SET_MANAGERS', managers })
      return managers
    }
    catch (err) {
      console.log('err in getManagers', err)
    }
  }
}
export function addManager(managerToAdd: Manager) {
  return async (dispatch: any) => {
    try {
      const manager = await managerService.addManager(managerToAdd)
      dispatch({ type: 'ADD_MANAGER', manager })
      return manager
    }
    catch (err) {
      console.log('err in getManagers', err)
    }
  }
}
export function updateManager(managerToUpdate: Manager) {
  return async (dispatch: any) => {
    try {
      const manager = await managerService.updateManager(managerToUpdate)
      dispatch({ type: 'UPDATE_MANAGER', manager })
      return manager
    }
    catch (err) {
      console.log('err in getManagers', err)
    }
  }
}
