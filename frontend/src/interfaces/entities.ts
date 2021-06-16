export interface Manager {
    _id?: string,
    fullname: string
}
export interface Meeting {
    _id?: string,
    startDate: Date,
    endDate: Date,
    createdBy: string,
    desc: string,
    occupationHours: number[],
    indexDate?: string
}