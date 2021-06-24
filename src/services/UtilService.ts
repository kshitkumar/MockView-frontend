import config from '../config.json';



export const fetchLocationAccessToken = async ()=>{
    const endPoint = "https://www.universal-tutorial.com/api/getaccesstoken";
    const header = {
      "Accept": "application/json",
      "api-token": "IHLV0UllTOmCuPTVXBMwGuFPnEOEuQVkYb3uwe7q6OtR9d3jGZPbuI5zq2dckayXLQg",
      "user-email": "visgoswami@deloitte.com"
    };
    const data  =await (await fetch (endPoint,{
        headers:header
    })).json();

    return data;
}

export const fetchAllCountries = async (locationAccessToken:string)=>{

    const endPoint = `https://www.universal-tutorial.com/api/countries`;
    const header = {
        'Authorization': `Bearer ${locationAccessToken}`,
        'Accept': "application/json"
    };
    const data = await (await fetch(endPoint,{
                        headers: header })).json();
    return data;
}

export const fetchAllStatesOfCountry = async (locationAccessToken:string,county:string)=>{

    const endPoint = `https://www.universal-tutorial.com/api/states/${county}`;
    const header = {
        Authorization:`Bearer ${locationAccessToken}`,
        Accept: "application/json"
    };
    const data = await (await fetch(endPoint,{
                        headers: header })).json();
    return data;
}

export const fetchAllCitieOfState = async (locationAccessToken:string,state:string)=>{

    const endPoint = `https://www.universal-tutorial.com/api/cities/${state}`;
    const header = {
        Authorization:`Bearer ${locationAccessToken}`,
         Accept: "application/json"
    };
    const data = await (await fetch(endPoint,{
                        headers: header })).json();
    return data;
}