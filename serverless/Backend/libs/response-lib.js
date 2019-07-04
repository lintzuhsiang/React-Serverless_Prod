export function success(body){
    return buildResponse(200,body);
}
export function failure(body){
    console.log(body);
    console.log("print failure");
    return buildResponse(500,body);
}

function buildResponse(statusCode,body){
    return {
        statusCode:statusCode,
        headers:{
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true 
        },
        body:JSON.stringify(body)
    }
}