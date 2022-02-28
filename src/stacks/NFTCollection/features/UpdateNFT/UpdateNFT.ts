// CUSTOM ERROR CLASS
import { LambdaToGatewayError } from "errors/LambdaToGatewayError";

// REQUEST / RESPONSE CLASS
import { UpdateNFTRequest } from "./UpdateNFTRequest";
import { UpdateNFTRequestI } from "./UpdateNFTRequest.schema";
import { UpdateNFTResponse } from "./UpdateNFTResponse";

// HANDLER
import { handleUpdateNFT } from "./handlers/HandleUpdateNFT";



export async function handler(event: UpdateNFTRequestI, context: { awsRequestId: string }): Promise<UpdateNFTResponse> {
  // VALIDATE REQUEST
  let updateNFTRequest: UpdateNFTRequest;
  try {
    updateNFTRequest = new UpdateNFTRequest(event);
  } catch (error) {
    throw new LambdaToGatewayError(error, context);
  };

  // HANDLE UPDATE
  try {
    return handleUpdateNFT(updateNFTRequest);
  } catch (error) {
    throw new LambdaToGatewayError(error, context);
  }
}