export function MeetingPreview({ meeting }: any) {

    const [date, start] = new Date(meeting.startDate).toLocaleString().split(', ')
    const startTime = start.split('.')[0]

    const end = new Date(meeting.endDate).toLocaleString().split(', ')[1]

    return (
        <div className="meeting-preview flex align-center">
            <span className="name">{meeting.createdBy.fullname}</span>
            <span className="date">{date}</span>
            <span className="time">{startTime} - {end}</span>
            <p className="desc">{meeting.desc || '(No description)'}</p>
        </div>
    )
}