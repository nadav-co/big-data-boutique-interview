import { Manager } from "../interfaces/entities"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { utils } from "../services/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../interfaces/state";
import { useEffect, useState } from "react";
import { meetingService } from "../services/meetingService";
import { getOccupations, saveMeeting } from "../store/actions/meetingActions";

export function MeetingEdit() {

    const dispatch = useDispatch()

    const { meetingToEdit, occupationsByDate } = useSelector((state: RootState) => state.meetingModule)
    const { managers } = useSelector((state: RootState) => state.managerModule)
    const [meeting, setMeeting] = useState(null)
    const [selfOccupation, setSelfOccupation] = useState([])
    const [msg, setMsg] = useState('')

    
    useEffect(() => {
        setEmptyMeeting()
    }, [managers])
    
    useEffect(() => {
        if (meetingToEdit) {
            const startDate = new Date(meetingToEdit.startDate)
            const endDate = (meetingToEdit.endDate) ? new Date(meetingToEdit.endDate) : null
            setMeeting({ ...meetingToEdit, startDate, endDate })
            if (meetingToEdit._id) {
                const occHours = new Array(endDate.getHours() - startDate.getHours()).fill('').map((a, idx) => startDate.getHours() + idx)
                setSelfOccupation(occHours)
            } else setSelfOccupation([])
        }
    }, [meetingToEdit])
    
    const setEmptyMeeting = () => {
        const emptyMeeting = { ...meetingService.getEmptyMeeting(), createdBy: managers[0] }
        dispatch({ type: 'SET_MEETING_TO_EDIT', meetingToEdit: { ...emptyMeeting } })
    }

    const filterStartHours = (time: Date) => {
        const hour = time.getHours()
        const dateNow = new Date()
        if (dateNow.toLocaleDateString() === time.toLocaleDateString()) {
            if (hour < dateNow.getHours()) return false
        }
        return (isWorkHours(hour, 1)) && isOccHours(time, hour)

    }

    const filterEndHours = (time: Date) => {
        const hour = time.getHours()
        if (hour <= meeting.startDate.getHours()) return false
        return (isWorkHours(hour)) && isOccHours(time, hour, 1)
    }

    const isWorkHours = (hour: number, diff: number = 0) => {
        return (hour < 9 || hour > (18 - diff)) ? false : true
    }

    const isOccHours = (time: Date, hour: number, diff: number = 0) => {
        if (selfOccupation.includes(hour - diff)) return true
        return (occupationsByDate[`${time.getMonth()}-${time.getDate()}`]?.includes(hour - diff)) ? false : true
    }

    const handleFormChange = ({ target }: any) => {
        var { name, value, type } = target
        if (type === 'select-one') value = JSON.parse(value)
        setMeeting({ ...meeting, [name]: value })
    }

    const saveDate = (dateToSave: Date | [Date, Date], name: string) => {
        const date = new Date(dateToSave.toLocaleString())
        if (date.getMonth() !== +occupationsByDate.month) {
            dispatch(getOccupations(date.toLocaleDateString()))
        }
        setMeeting({ ...meeting, [name]: date })
    }

    const onSaveMeeting = (ev: any) => {
        ev.preventDefault()
        const { startDate, endDate } = meeting
        if (!startDate || !endDate || startDate.getMilliseconds()) {
            onSetMsg('Please choose start and end dates.')
            return
        }
        try {
            dispatch(saveMeeting({ ...meeting }))
            setEmptyMeeting()
        } catch (err) {
            onSetMsg('Can not save. Please try again')
        }
    }

    const onSetMsg = (msg: string) => {
        setMsg(msg)
        setTimeout(setMsg, 3000, '')
    }


    if (!meeting?.startDate || !managers) return <h1>Loading</h1>
    return (
        <section className="meeting-edit">
            <h3>{msg}</h3>
            <form className="flex col" onSubmit={onSaveMeeting}>
                <label>
                    Manager:
                    <br />
                    <select name="createdBy" onInput={handleFormChange} value={JSON.stringify(meeting.createdBy)}>
                        {managers.map((manager: Manager) => <option key={utils.makeId()} value={JSON.stringify(manager)}>{manager.fullname}</option>)}
                    </select>
                </label>
                <label>
                    Start:
                    <br />
                    <DatePicker
                        selected={new Date(meeting.startDate)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        showTimeSelect
                        timeIntervals={60}
                        filterTime={filterStartHours}
                        dateFormat="MMMM d, yyyy h aa"
                        scrollableYearDropdown
                        onChange={date => saveDate(date, 'startDate')}
                    />
                </label>
                <label>
                    End:
                    <br />
                    <DatePicker
                        selected={new Date(meeting.endDate || meeting.startDate)}
                        includeDates={[new Date(meeting.startDate)]}
                        showTimeSelect
                        timeIntervals={60}
                        filterTime={filterEndHours}
                        dateFormat="h aa"
                        dropdownMode="select"
                        onChange={date => saveDate(date, 'endDate')}
                    />
                </label>
                <label>
                    Description:
                    <br />
                    <textarea name="desc" onChange={handleFormChange} value={meeting.desc} placeholder="Enter Meeting Description"></textarea>
                </label>
                <div className="buttons flex space-bt">
                    <button type="button" className={`cancel nice-btn ${meeting._id ? '' : 'hidden'}`} onClick={setEmptyMeeting}>Cancel</button>
                    <button className="nice-btn" type="submit">Save Meeting</button>
                </div>
            </form>

        </section>
    )
}