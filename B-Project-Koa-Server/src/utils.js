export const setStatus = (context, status, result) => {
    context.body = result;
    context.status = status;
}

export const BAD_REQUEST = 400,
             OK = 200;