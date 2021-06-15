import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { MeetingEdit } from "../cmps/MeetingEdit"
import { MeetingList } from "../cmps/MeetingList"
import { RootState } from "../interfaces/state"


export function Room() {
    const { occupationsByDate } = useSelector((state: RootState) => state.meetingModule)
    const [isOccupied, setIsOccupied] = useState(false)

    useEffect(() => {
        const MIN = 1000 * 60
        const HOUR = MIN * 60
        const start = new Date()
        const startHour = start.getHours()
        var hourInterval: any
        const minInterval = setInterval(() => {
            if (new Date().getHours() !== startHour) {
                hourInterval = setInterval(checkOccupation, HOUR)
                clearInterval(minInterval)
            }
        }, MIN)
        return () => {
            clearInterval(minInterval)
            clearInterval(hourInterval)
        }
    }, [])
    useEffect(() => {
        checkOccupation()
    }, [occupationsByDate])

    const checkOccupation = () => {
        const now = new Date()
        const date = `${now.getMonth()}-${now.getDate()}`
        if (occupationsByDate[date]?.includes(now.getHours())) setIsOccupied(true)
        else if (isOccupied) setIsOccupied(false)
    }

    return (
        <section className="room-details">
            <h1 className="room-occupation">Room 1 is {isOccupied ? 'currently occupied 🔴' : 'available 🟢'}</h1>
            <MeetingList />
            <MeetingEdit />
        </section>
    )
}

