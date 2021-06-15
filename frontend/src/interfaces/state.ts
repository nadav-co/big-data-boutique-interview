import { Manager, Meeting } from "./entities";

export interface RootState {
  meetingModule: MeetingModule,
  managerModule: ManagerModule
}
export interface MeetingModule {
  meetings: Meeting[],
  meetingToEdit: Meeting,
  occupationsByDate: any
}
export interface ManagerModule {
  managers: Manager[],
}