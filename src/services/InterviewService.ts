import http from './HttpService';
import config from '../config.json';
import { InterviewerFilter } from "../models/InterviewerFilter";

const apiEndPoint = config.apiBaseUrl + "/interviews"

export async function getInterviewers(filter : InterviewerFilter) {
    return http.get(
        apiEndPoint+"/interviewers",
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