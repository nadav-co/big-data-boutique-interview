import { Meeting } from "../../interfaces/entities"
import { MeetingModule } from "../../interfaces/state"


const initialState: MeetingModule = {
  meetings: [],
  meetingToEdit: null,
  occupationsByDate: {}
}

export function meetingReducer(state = initialState, action: any = {}) {
  switch (action.type) {
    case 'SET_MEETING_TO_EDIT':
      return { ...state, meetingToEdit: action.meetingToEdit }
    case 'SET_MEETINGS':
      return { ...state, meetings: action.meetings }
    case 'ADD_MEETING':
      return { ...state, meetings: [...state.meetings, action.meeting] }
    case 'UPDATE_MEETING':
      let meetings = state.meetings.map(meeting => (meeting._id === action.meeting._id) ? action.meeting : meeting)
      return { ...state, meetings }
    case 'SET_OCCUPATIONS':
      return { ...state, occupationsByDate: action.occupations }
    default:
      return state
  }
}
