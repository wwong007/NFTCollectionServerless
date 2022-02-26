import { MethodBought, MethodBoughtArray } from "database/models/NFTCollection/NFTCollection.model";
import { SchemaMappedType, TopLevelSchema } from "validation/SchemaCheck";



// INTERFACE
export interface AddNFTI {
  id: string;
  name: string;
  tokenId: number;
  priceBought: number;
  dateBought: number;
  feeBought: number;
  url: string;
  methodBought: MethodBought;
  isSold: boolean;
};

// SCHEMA PROP TYPE
type AddNFTSchemaProperties = SchemaMappedType<AddNFTI>;

const properties: AddNFTSchemaProperties = {
  id: { type: 'string' },
  name: { type: 'string' },
  tokenId: { type: 'number' },
  priceBought: { type: 'number' },
  dateBought: { type: 'number' },
  feeBought: { type: 'number' },
  url: { type: 'string' },
  methodBought: { type: 'string', enum: MethodBoughtArray },
  isSold: { type: 'boolean' }
};

// SCHEMA TYPE
type AddNFTSchema = TopLevelSchema<AddNFTSchemaProperties>;

const schema: AddNFTSchema = {
  '$id': 'AddNFTRequestSchema',
  type: 'object',
  properties,
  required: [ 'id', 'name', 'tokenId', 'priceBought', 'dateBought', 'feeBought', 'methodBought', 'url', 'isSold' ]
};
