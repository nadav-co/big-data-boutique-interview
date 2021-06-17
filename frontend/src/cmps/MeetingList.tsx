import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Meeting } from "../interfaces/entities";
import { utils } from "../services/utils";
import { MeetingPreview } from "./MeetingPreview";
import { getMeetings, setMeetingToEdit } from "../store/actions/meetingActions";
import { RootState } from "../interfaces/state";
import DatePicker from "react-datepicker";

export function MeetingList() {

    const { meetings } = useSelector((state: RootState) => state.meetingModule)
    const [filteredMeetings, setFIlteredMeetings] = useState([])
    const [date, setDate] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        setDate(new Date())
    }, [])

    useEffect(() => {
        const date = new Date()
        dispatch(getMeetings(date))
    }, [dispatch])
    
    useEffect(() => {
        date && filterMeetings()
    }, [date, meetings])
    
    const onSetDate = (newDate: any) => {
        if (date.getMonth() !== newDate.getMonth()) {
            dispatch(getMeetings(new Date(newDate)))
        }
        setDate(newDate)
    }

    const filterMeetings = () => {
        const filtered = meetings?.filter(m => (new Date(m.startDate).getDate() === date.getDate()))
        setFIlteredMeetings(filtered.sort((a, b) => new Date(a.startDate).getHours() - new Date(b.startDate).getHours()))
    }

    return (
        <main className="meeting-list flex col">
            <h1>meetings</h1>
            <DatePicker
                selected={date}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                yearDropdownItemNumber={20}
                timeIntervals={60}
                dateFormat="MMMM d, yyyy"
                scrollableYearDropdown
                dropdownMode="select"
                onChange={date => onSetDate(date)}
            />
            <div className="title flex align-center">
                <h3 className="name">Manager</h3>
                <h3 className="date">Date</h3>
                <h3 className="time">Time</h3>
                <h3 className="desc">Description</h3>
            </div>
            {(filteredMeetings?.length) ?
                <section className="meetings-container">
                    {filteredMeetings.map((meeting: Meeting) => (
                        <div key={utils.makeId()} onClick={() => dispatch(setMeetingToEdit(meeting._id))}>
                            <MeetingPreview meeting={meeting} />
                        </div>
                    ))}
                </section> :
                <h2>(No Meetings On {date?.toDateString()})</h2>}
        </main>
    )
}