import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Meeting } from "../interfaces/entities";
import { utilService } from "../services/utilService";
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
        const dateParams = new Date().toLocaleString().split(',')[0]
        dispatch(getMeetings(dateParams))
    }, [dispatch])

    useEffect(() => {
        date && filterMeetings()
    }, [date, meetings])

    const onSetDate = (newDate: any) => {
        if (date.getMonth() !== newDate.getMonth()) {
            const dateParams = newDate.toLocaleString().split(',')[0]
            dispatch(getMeetings(dateParams))
        }
        setDate(newDate)
    }

    const filterMeetings = () => {
        const filtered = meetings?.filter(m => (new Date(m.startDate).getDate() === date.getDate()))
        setFIlteredMeetings(filtered)
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
                        <div key={utilService.makeId()} onClick={() => dispatch(setMeetingToEdit(meeting._id))}>
                            <MeetingPreview meeting={meeting} />
                        </div>
                    ))}
                </section> :
                <h2>(No Meetings On {date?.toDateString()})</h2>}
        </main>
    )
}