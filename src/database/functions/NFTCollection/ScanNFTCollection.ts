// CLASS
import { NFTCollection } from "database/models/NFTCollection/NFTCollection.model";

// DATA MAPPER FUNCTION
import { scan } from "aws/DynamoDB/DynamoMapper";


export function scanNFTCollection(): Promise<NFTCollection[]> {
  try {
    return scan(NFTCollection);
  } catch (error) {
    throw error;
  };
};