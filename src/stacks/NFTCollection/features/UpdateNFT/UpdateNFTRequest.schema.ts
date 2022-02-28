// CUSTOM TYPES / ENUM
import { MethodSold, MethodSoldArray } from "database/models/NFTCollection/NFTCollection.model";
import { SchemaMappedType, TopLevelSchema } from "validation/SchemaCheck";

// VALIDATION FUNCTION
import { validateInputWithSchema } from "validation/ValidateWithSchema";



// INTERFACE
export interface UpdateNFTRequestI {
  id: string;
  priceSold: number;
  dateSold: number;
  feeSold: number;
  methodSold: MethodSold;
};

// PROP TYPE / PROPS
type UpdateNFTRequestProperties = SchemaMappedType<UpdateNFTRequestI>;

const properties: UpdateNFTRequestProperties = {
  id: { type: 'string' },
  priceSold: { type: 'number' },
  dateSold: { type: 'number' },
  feeSold: { type: 'number' },
  methodSold: { type: 'string', enum: MethodSoldArray }
};

// SCHEMA TYPE / SCHEMA
type UpdateNFTRequestSchema = TopLevelSchema<UpdateNFTRequestProperties>;

const schema: UpdateNFTRequestSchema = {
  '$id': 'UpdateNFTRequestSchema',
  type: 'object',
  properties,
  required: [ 'id', 'priceSold', 'dateSold', 'feeSold', 'methodSold' ]
};

// VALIDATION FUNCTION

export function validateUpdateNFTRequest(input: unknown): input is UpdateNFTRequestI {
  return validateInputWithSchema<UpdateNFTRequestI, UpdateNFTRequestProperties>(input, schema);
};

