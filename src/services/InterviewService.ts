import http from './HttpService';
import config from '../config.json';
import { InterviewerFilter } from "../models/InterviewerFilter";

const apiEndPoint = config.apiBaseUrl + "/interviews"

export async function getInterviewers(filter : InterviewerFilter) {
    return http.get(
        apiEndPoint + "/"+filter.userId +"/interviewers",
        {
            params : {
                "industry" : filter.industry,
                "date" : filter.date,
                "startTime" : filter.timing.startTime,
                "endTime" : filter.timing.endTime,
                "position" : filter.position
            }
        }
    )
}

export const getUpcomingInterviewForInterviewer=(userId:number)=>{
    return http.get(`${apiEndPoint}/${userId}/interviewer/upcoming`);
}

export const getCompletedInterviewForInterviewer=(userId:number)=>{
    return http.get(`${apiEndPoint}/${userId}/interviewer/completed`);
}
export const getUpcomingInterviewForInterviewee=(userId:number)=>{
    return http.get(`${apiEndPoint}/${userId}/interviewee/upcoming`);
}
export const getCompletedInterviewForInterviewee=(userId:number)=>{
    return http.get(`${apiEndPoint}/${userId}/interviewee/completed`);
}