// DYNAMO DB MODEL
import { NFTCollection } from "database/models/NFTCollection/NFTCollection.model";
// DB FUNCTION
import { scanNFTCollection } from "database/functions/NFTCollection/ScanNFTCollection";

// CUSTOM ERROR CLASS
import { LambdaToGatewayError } from "errors/LambdaToGatewayError";



export async function handler(events: {}, context: { awsRequestId: string }): Promise<NFTCollection[]> {
  try {
    return scanNFTCollection();
  } catch (error) {
    throw new LambdaToGatewayError(error, context);
  }
}