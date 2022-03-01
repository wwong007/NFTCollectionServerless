// DB MODEL AND SCHEMA
import { NFTCollection, NFTCollectionI } from "database/models/NFTCollection/NFTCollection.model";
import { nftCollectionSchema } from "database/models/NFTCollection/NFTCollection.schema";

// REQUEST CLASS
import { AddNFTRequest } from "stacks/NFTCollection/features/AddNFT/AddNFTRequest";

// VALIDATION FUNCTIONS
import { removeInvalidProperties, validateInputWithSchema } from "validation/ValidateWithSchema";


export function nftCollectionFactoryFromCompleteProps(props: NFTCollectionI): NFTCollection {
  if (validateInputWithSchema(props, nftCollectionSchema)) {
    const validatedProps = removeInvalidProperties(props, nftCollectionSchema);;
    return Object.assign(new NFTCollection, validatedProps);
  };
  throw new Error('InvalidFactoryProps: nftCollectionFactoryFromCompleteProps');
};

export function nftCollectionFactoryFromAddNFTRequest(request: AddNFTRequest): NFTCollection {
  const { id, name, tokenId, priceBought, dateBought, feeBought, methodBought, url } = request;
  const props: NFTCollectionI = {
    id,
    name,
    tokenId,
    priceBought,
    priceSold : null,
    dateBought,
    dateSold : null,
    feeBought,
    feeSold: null,
    isSold: false,
    url,
    methodBought,
    methodSold: null
  };

  return nftCollectionFactoryFromCompleteProps(props);
}