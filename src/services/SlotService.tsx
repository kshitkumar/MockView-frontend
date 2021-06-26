import http from './HttpService';
import config from '../config.json';
import { OpenInterviewRequestModel } from '../models/OpenInterviewRequestModel';


const apiEndPoint = config.apiBaseUrl+'/interviews';

export const saveInterviewSlots= async(userId : number,bookinterviewRequest:OpenInterviewRequestModel)=>{
         return http.post(`${apiEndPoint}/${userId}/availability`,bookinterviewRequest);
}

export const fetchVacantAndBookedInterviewSlots= async(userId : number)=>{
    return http.get(`${apiEndPoint}/${userId}/availability`);
}

export const deleteSlot=async(slotId:number)=>{
    return http.delete(`${apiEndPoint}/slots/${slotId}/slot`)
}
