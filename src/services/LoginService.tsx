import { UserCredentials } from '../models/UserCredentials';
import http from './HttpService';
import config from '../config.json';

const apiEndPoint = config.apiBaseUrl + "/login"

export async function login(userCredentials : UserCredentials) {
    return http.post(apiEndPoint, userCredentials)
}
