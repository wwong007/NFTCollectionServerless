// CUSTOM SCHEMA TYPE
import { SchemaMappedType, TopLevelSchema } from "validation/SchemaCheck";

// CUSTOM TYPES
import { MethodBoughtArray, MethodSoldArray, NFTCollectionI } from "./NFTCollection.model";



export type NFTCollectionProperties = SchemaMappedType<NFTCollectionI>;
export type NFTCollectionSchema = TopLevelSchema<NFTCollectionProperties>;

export const nftCollectionProperties: NFTCollectionProperties = {
  id: { type: 'string' },
  name: { type: 'string' },
  tokenId: { type: 'number' },
  priceBought: { type: 'number' },
  priceSold: { type: ['number', 'null'] },
  dateBought: { type: 'number' },
  dateSold: { type: ['number', 'null'] },
  isSold: { type: 'boolean' },
  feeBought: { type: 'number' },
  feeSold: { type: ['number', 'null'] },
  url: { type: 'string' },
  methodBought: { type: 'string', enum: MethodBoughtArray },
  methodSold: { type: 'string', enum: MethodSoldArray }
};

export const nftCollectionSchema: NFTCollectionSchema = {
  '$id': 'NFTCollectionSchema',
  type: 'object',
  properties: nftCollectionProperties,
  required: [ 'id' ]
};