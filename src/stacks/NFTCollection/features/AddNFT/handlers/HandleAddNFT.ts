// DB MODEL
import { NFTCollection } from "database/models/NFTCollection/NFTCollection.model";

// REQUEST CLASS
import { AddNFTRequest } from "../AddNFTRequest";

// DYNAMO MAPPER FUNCTION
import { putItem } from "aws/DynamoDB/DynamoMapper";

// FACTORY FUNCTION
import { nftCollectionFactoryFromAddNFTRequest } from "database/functions/NFTCollection/NftCollection.factory";


export async function handleAddNFT(request: AddNFTRequest): Promise<NFTCollection> {
  try {
    const requestItem: NFTCollection = nftCollectionFactoryFromAddNFTRequest(request);
    return putItem(requestItem);
  } catch (error) {
    throw error;
  };
};