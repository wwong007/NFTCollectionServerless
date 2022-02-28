import { MethodSold } from "database/models/NFTCollection/NFTCollection.model";
import { RequestWithValidation } from "validation/RequestWithValidation";
import { UpdateNFTRequestI, validateUpdateNFTRequest } from "./UpdateNFTRequest.schema";



export class UpdateNFTRequest extends RequestWithValidation {
  readonly id: string;
  readonly priceSold: number;
  readonly dateSold: number;
  readonly feeSold: number;
  readonly methodSold: MethodSold;


  constructor(input: UpdateNFTRequestI) {
    super(input, validateUpdateNFTRequest);
    this.id = input.id;
    this.priceSold = input.priceSold;
    this.dateSold = input.dateSold;
    this.feeSold = input.feeSold;
    this.methodSold = input.methodSold;
  };
};