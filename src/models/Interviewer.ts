import { Timeslot } from "./Timeslot";

export interface Interviewer {
    id : number,
    interviewerName : string,
    company : string,
    position : string,
    joiningDate : string,
    endingDate : string,
    experience : number,
    timeSlots : Timeslot[]
}