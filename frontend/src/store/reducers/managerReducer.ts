import { Manager } from "../../interfaces/entities"

export interface ManagerState {
    managers: Manager[]
}
const initialState: ManagerState = {
    managers: [],
}

export function ManagerReducer(state = initialState, action: any = {}) {
    switch (action.type) {
        case 'SET_MANAGERS':
            return { ...state, managers: action.managers }
        case 'ADD_MANAGER':
            return { ...state, managers: [...state.managers, action.manager] }
        case 'UPDATE_MANAGER':
            let managers = state.managers.map(manager => (manager._id === action.manager._id) ? action.manager : manager)
            return { ...state, managers }
        default:
            return state
    }
}
