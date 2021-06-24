import http from './HttpService';
import config from '../config.json';
import {UserDetailModel} from '../models/UserDetailModel'

const apiEndPoint = config.apiBaseUrl + "/users"

 
export async function saveUserDetail(userId : number,userDetailModel : UserDetailModel) {
    console.log(`${apiEndPoint}/${userId}/detail`);    
    return http.post(`${apiEndPoint}/${userId}/detail`, userDetailModel);
}
