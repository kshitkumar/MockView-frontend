interface Timeslot {
    startTime : string,
    endTime : string
}
export interface Interviewer {
    id : number,
    name : string,
    company : string,
    position : string,
    joiningDate : string,
    endingDate : string,
    experience : number,
    timeslots : Timeslot[]
}