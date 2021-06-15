import { combineReducers } from 'redux'
import { ManagerReducer } from './managerReducer'
import { meetingReducer } from './meetingReducer'

export const rootReducer = combineReducers({
  meetingModule: meetingReducer,
  managerModule: ManagerReducer
})