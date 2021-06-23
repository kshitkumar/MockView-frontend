import config from '../config.json';

export const fetchAllCountries = async ()=>{

    const endPoint = `https://www.universal-tutorial.com/api/countries`;
    const header = {
        Authorization: config.locationAccessToken,
        Accept: "application/json"
    };
    const data = await (await fetch(endPoint,{
                        headers: header })).json();
    return data;
}

export const fetchAllStatesOfCountry = async (county:string)=>{

    const endPoint = `https://www.universal-tutorial.com/api/states/${county}`;
    const header = {
        Authorization:config.locationAccessToken,
        Accept: "application/json"
    };
    const data = await (await fetch(endPoint,{
                        headers: header })).json();
    return data;
}

export const fetchAllCitieOfState = async (state:string)=>{

    const endPoint = `https://www.universal-tutorial.com/api/cities/${state}`;
    const header = {
        Authorization:config.locationAccessToken,
         Accept: "application/json"
    };
    const data = await (await fetch(endPoint,{
                        headers: header })).json();
    return data;
}