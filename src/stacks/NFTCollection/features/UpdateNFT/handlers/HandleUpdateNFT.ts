// DYNAMO EXPRESSION
import { UpdateExpression } from "@aws/dynamodb-expressions";

// DB MODEL
import { NFTCollection } from "database/models/NFTCollection/NFTCollection.model";

// REQUEST INTERFACE
import { UpdateNFTRequestI } from "../UpdateNFTRequest.schema";

// DYNAMO MAPPER FUNCTION
import { executeUpdateExpression } from "aws/DynamoDB/DynamoMapper";

// FACTORY FUNCTION 
import { updateNFTExpressionFactoryFromRequest } from "database/functions/NFTCollection/UpdateNFT.factory";




export async function handleUpdateNFT(request: UpdateNFTRequestI): Promise<NFTCollection> {
  try {
    const updateExpression: UpdateExpression = updateNFTExpressionFactoryFromRequest(request);
    return executeUpdateExpression(updateExpression, { id: request.id }, NFTCollection)
  } catch (error) {
    throw error;
  }
}