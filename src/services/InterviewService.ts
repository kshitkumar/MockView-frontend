import { Interviewer } from "../models/Interviewer"

const interviewer1 = {
    id : 1,
    name : "Adam Roberts",
    company : "IBM",
    position : "Technical Lead",
    joiningDate : "2021-01-01",
    endingDate : "Present",
    experience : 3.5,
    timeslots : [{startTime : "9:30", endTime : "10:30"},
    {startTime : "11:30", endTime : "12:30"},
    {startTime : "13:30", endTime : "1:30"}]
}

const interviewer2 = {
    id : 2,
    name : "Adam Roberts Jr",
    company : "IBM",
    position : "Technical Lead",
    joiningDate : "2021-01-01",
    endingDate : "Present",
    experience : 3.5,
    timeslots : [{startTime : "9:30", endTime : "10:30"},
    {startTime : "11:30", endTime : "12:30"},
    {startTime : "13:30", endTime : "1:30"}]
}

const interviewers : Interviewer[] = [interviewer1, interviewer2];

export async function getInterviewers() {
    return interviewers;
}