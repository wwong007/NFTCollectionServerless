// CUSTOM TYPES
import { MethodBought, MethodBoughtArray } from "database/models/NFTCollection/NFTCollection.model";
import { SchemaMappedType, TopLevelSchema } from "validation/SchemaCheck";

// VALIDATION FUNCTION
import { validateInputWithSchema } from "validation/ValidateWithSchema";



// INTERFACE
export interface AddNFTRequestI {
  id: string;
  name: string;
  tokenId: number;
  priceBought: number;
  dateBought: number;
  feeBought: number;
  url: string;
  methodBought: MethodBought;
};

// SCHEMA PROP TYPE
type AddNFTSchemaProperties = SchemaMappedType<AddNFTRequestI>;

const properties: AddNFTSchemaProperties = {
  id: { type: 'string' },
  name: { type: 'string' },
  tokenId: { type: 'number' },
  priceBought: { type: 'number' },
  dateBought: { type: 'number' },
  feeBought: { type: 'number' },
  url: { type: 'string' },
  methodBought: { type: 'string', enum: MethodBoughtArray }
};

// SCHEMA TYPE
type AddNFTSchema = TopLevelSchema<AddNFTSchemaProperties>;

const schema: AddNFTSchema = {
  '$id': 'AddNFTRequestSchema',
  type: 'object',
  properties,
  required: [ 'id', 'name', 'tokenId', 'priceBought', 'dateBought', 'feeBought', 'methodBought', 'url' ]
};


// VALIDATION
export function validateAddNFTRequest (input: unknown): input is AddNFTRequestI {
  return validateInputWithSchema(input, schema);
}