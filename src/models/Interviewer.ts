import { Timeslot } from "./Timeslot";

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