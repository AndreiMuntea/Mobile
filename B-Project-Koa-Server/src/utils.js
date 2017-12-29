export const setStatus = (context, status, result) => {
    context.body = result;
    context.status = status;
}

export const BAD_REQUEST = 400,
             OK = 200;


export const getDate = (date) => {
    var timestamp = Date.parse(date);
    
    if (isNaN(timestamp) == false){
        return new Date(timestamp);
    };

    return null;
}

export const getInt = (number) => {
    var value = parseInt(number);

    if(isNaN(value)){
        return null;
    }

    return value;
}