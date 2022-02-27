// DB MODEL
import { NFTCollection } from "database/models/NFTCollection/NFTCollection.model";

// REQUEST CLASS/SCHEMA
import { AddNFTRequest } from "./AddNFTRequest";
import { AddNFTRequestI } from "./AddNFTRequest.schema";

// CUSTOM ERROR CLASS
import { LambdaToGatewayError } from "errors/LambdaToGatewayError";

// HANDLER
import { handleAddNFT } from "./handlers/HandleAddNFT";



export async function handler(event: AddNFTRequestI, context: { awsRequestId: string }): Promise<NFTCollection> {
  // REQUEST VALIDATION
  let addNFTRequest: AddNFTRequest;
  try {
    addNFTRequest = new AddNFTRequest(event);
  } catch (error) {
    throw new LambdaToGatewayError(error, context);
  };

  // HANDLE PUT NFT INTO NFT COLLECTION TABLE
  try {
    return await handleAddNFT(addNFTRequest);
  } catch (error) {
    throw new LambdaToGatewayError(error, context);
  }
};