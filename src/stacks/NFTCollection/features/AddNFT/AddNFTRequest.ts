// VALIDATION CLASS
import { RequestWithValidation } from "validation/RequestWithValidation";

// CUSTOM TYPE
import { MethodBought } from "database/models/NFTCollection/NFTCollection.model";

// REQUEST INTERFACE & VALIDATION FUNCTION
import { AddNFTRequestI, validateAddNFTRequest } from "./AddNFTRequest.schema";


export class AddNFTRequest extends RequestWithValidation {
  readonly id: string;
  readonly name: string;
  readonly tokenId: number;
  readonly priceBought: number;
  readonly dateBought: number;
  readonly feeBought: number;
  readonly methodBought: MethodBought;
  readonly url: string;

  constructor(input: AddNFTRequestI) {
    super(input, validateAddNFTRequest);

    this.id = input.id;
    this.name = input.name;
    this.tokenId = input.tokenId;
    this.priceBought = input.priceBought;
    this.dateBought = input.dateBought;
    this.feeBought = input.feeBought;
    this.methodBought = input.methodBought;
    this.url = input.url;
  };
};