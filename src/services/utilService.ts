
export const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJ2aXNnb3N3YW1pQGRlbG9pdHRlLmNvbSIsImFwaV90b2tlbiI6IklITFYwVWxsVE9tQ3VQVFZYQk13R3VGUG5FT0V1UVZrWWIzdXdlN3E2T3RSOWQzakdaUGJ1STV6cTJkY2theVhMUWcifSwiZXhwIjoxNjI0MzgxMzg4fQ.-5gaVOSg02jn0vQJcnTY-8xxl2jSkUugQIZikxu3Ww8';
export const fetchAllCountries = async ()=>{

    const endPoint = `https://www.universal-tutorial.com/api/countries`;
    const header = {
        Authorization: token,
        Accept: "application/json"
    };
    const data = await (await fetch(endPoint,{
                        headers: header })).json();
    return data;
}

export const fetchAllStatesOfCountry = async (county:string)=>{

    const endPoint = `https://www.universal-tutorial.com/api/states/${county}`;
    const header = {
        Authorization:token,
        Accept: "application/json"
    };
    const data = await (await fetch(endPoint,{
                        headers: header })).json();
    return data;
}

export const fetchAllCitieOfState = async (state:string)=>{

    const endPoint = `https://www.universal-tutorial.com/api/cities/${state}`;
    const header = {
        Authorization:token,
         Accept: "application/json"
    };
    const data = await (await fetch(endPoint,{
                        headers: header })).json();
    return data;
}