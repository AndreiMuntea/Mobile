const serverUrl = 'http://192.168.0.50:3000';
export const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const authHeaders = (token) => ({...headers, 'Authorization': `Bearer ${token}`});

export const callServerPostAPI = async(suffix, body, headers) =>{
    let result = await fetch(serverUrl + suffix, {method: "POST", headers, body: JSON.stringify(body)})
    .then((response) => response.json())
    .then((response) => {
        return response;
    })
    .catch((error) => {
        return {status:false, response: error};
    });

    return result;
}

export const callServerPutAPI = async(suffix, body, headers) =>{
    let result = await fetch(serverUrl + suffix, {method: "PUT", headers, body: JSON.stringify(body)})
    .then((response) => response.json())
    .then((response) => {
        return response;
    })
    .catch((error) => {
        return {status:false, response: error};
    });

    return result;
}

export const callServerGetAPI = async(suffix, body, headers) =>{
    let result = await fetch(serverUrl + suffix)
    .then((response) => response.json())
    .then((response) => {
        return response;
    })
    .catch((error) => {
        return {status:false, response: error};
    });

    return result;
}