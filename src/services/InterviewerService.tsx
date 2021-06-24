import http from './HttpService';
import config from '../config.json';
import { BookInterviewRequestModel } from '../models/BookInterviewRequestModel';

const apiEndPoint = config.apiBaseUrl+'/interviews';

export const saveInterviewSlots= async(userId : number,bookinterviewRequest:BookInterviewRequestModel)=>{
         return http.post(`${apiEndPoint}/${userId}/availability`,bookinterviewRequest);
}
