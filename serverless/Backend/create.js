//single Lambda function "create.main" to handle a single HTTP post event at /notes endpointaw

import uuid from "uuid";
import {success,failure} from "./libs/response-lib";
import * as dynamoDBLib from "./libs/dynamodb-lib";
// const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event, context,callback){
    const data = JSON.parse(event.body);  //make event.body a JS object

    const params = {
        TableName: "Notes",
        Item:{
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt:Date.now(),
        }
    }
    try{
        await dynamoDBLib.call("put",params);
        console.log("print something")
        return success(params.Item)
        
    }catch(e){
        console.log(e);
        // return failure({status:false})
        callback(null,failure({status:false}));
    }
    // dynamoDb.put(params,(error,data)=>{
        
    //     if(error){
    //         const response = failure(body)
    //         callback(null,response);
    //         return;
    //     }
      
    //     const response = success(params.Item);
    //     callback(null,response)
    // })
}