import { Meeting } from "../../interfaces/entities"
import { meetingService } from "../../services/meetingService"

export function getMeetings(date: string) {
  return async (dispatch: any) => {
    try {
      const meetings = await meetingService.query(date)
      dispatch({ type: 'SET_MEETINGS', meetings })
      return meetings
    }
    catch (err) {
      console.log('err in getMeetings', err)
    }
  }
}

export function setMeetingToEdit(id: string) {
  return async (dispatch: any) => {
    try {
      const meetingToEdit = await meetingService.getById(id) //no need if we have sockets
      dispatch({ type: 'SET_MEETING_TO_EDIT', meetingToEdit })
      return meetingToEdit
    }
    catch (err) {
      console.log('err in getMeetingById', err)
    }
  }
}

export function saveMeeting(newMeeting: Meeting) {
  return async (dispatch: any) => {
    try {
      if (newMeeting._id) {
        var meeting = await meetingService.updateMeeting(newMeeting)
        dispatch({ type: 'UPDATE_MEETING', meeting })
      } else {
        meeting = await meetingService.addMeeting(newMeeting)
        dispatch({ type: 'ADD_MEETING', meeting })
      }
      const occupations = await meetingService.getOccupations(new Date(meeting.startDate).getFullYear())
      
      dispatch({ type: 'SET_OCCUPATIONS', occupations })
      return meeting
    }
    catch (err) {
      console.log('err in updateMeeting', err)
      throw err
    }
  }
}

export function getOccupations(year: string | number) {
  return async (dispatch: any) => {
    try {
      const occupations = await meetingService.getOccupations(year)
      dispatch({ type: 'SET_OCCUPATIONS', occupations })
      return occupations
    }
    catch (err) {
      console.log('err in getMeetingById', err)
    }
  }
}