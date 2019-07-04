import * as dynamoDBLib from "./libs/dynamodb-lib";
import {success,failure} from "./libs/response-lib";
import { fail } from "assert";




async function List(event,context){
    const params = {
        TableName:"Notes",
        //KeyConditionExpression, defines the condition for the query - 'userId = :userId': only return items with matching 'userId' partition key
        //Expression AttributeValues, defines the value in the condition - ':userId': defines 'userId' to be Identity Pool identity id of the authenticated user
        KeyConditionExpression:"userId=:userId",
        ExpressionAttributeValues:{
            ":userId":event.requestContext.identity.cognitoIdentityId
        }
    }
    try{
        const result = await dynamoDBLib.call("query",params)
        console.log(result)
        return success(result.Items)
    }catch(e){
        console.log(e)
        return failure({status:false});
    }
}

export default List;