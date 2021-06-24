import http from './HttpService';
import config from '../config.json';

const apiEndPoint = config.apiBaseUrl;


export const fetchCompanies = async ()=>{

    const header = {
        Accept: "application/json"
    };
    const data = await (await fetch(`${apiEndPoint}/companies`,{
                        headers: header })).json();
    return data;
}

export const  fetchIndustries = async ()=>{
    const header = {
        Accept: "application/json"
    };
    const data = await (await fetch(`${apiEndPoint}/industries`,{
        headers: header })).json();
return data;
}
export const fetchPositions= async ()=>{
    const header = {
        Accept: "application/json"
    };
    return await (await http.get(`${apiEndPoint}/positions`,{headers:header})).data.values ;
}

