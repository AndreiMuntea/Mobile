const serverUrl = 'http://192.168.0.20:3000';
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};


export const callServerAPI = async(suffix, method, body) =>{
    let result = await fetch(serverUrl + suffix, {method: method, headers, body: JSON.stringify(body)})
    .then((response) => response.json())
    .then((response) => {
        return response;
    })
    .catch((error) => {
        return {status:false, response: error};
    });

    return result;
}