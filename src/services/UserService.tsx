import http from './httpService';
import {User} from '../models/User';
import config from '../config.json';

const apiEndPoint = config.apiBaseUrl + "/users"

export async function saveUser(user : User) {
    return await http.post(apiEndPoint, user);
}