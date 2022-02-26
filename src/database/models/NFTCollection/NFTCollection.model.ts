import {
  table,
  attribute,
  hashKey
} from '@aws/dynamodb-data-mapper-annotations'

export type MethodBought = 'mint' | 'secondary' | 'private' | 'trade';
export type MethodSold = Omit<MethodBought, 'mint'>
export const MethodBoughtArray: MethodBought[] = [ 'mint', 'private', 'secondary', 'trade'];
export const MethodSoldArray: MethodSold[] = [ 'private', 'secondary', 'trade' ];

export enum MethodsType {
  MINT = 'mint',
  PRIVATE = 'private',
  SECONDARY = 'secondary',
  TRADE = 'trade'
};

// INTERFACE
export interface NFTCollectionI {
  // Initials of project name + tokenId + timestamp bought
  id: string;
  name: string;
  tokenId: number;
  priceBought: number;
  priceSold: number | null;
  dateBought: number
  dateSold: number | null;
  isSold: boolean;
  feeBought: number;
  feeSold: number | null;
  url: string;
  methodBought: MethodBought;
  methodSold: MethodSold, 
};

@table('NFTCollection')
export class NFTCollection implements NFTCollectionI {
  //PK
  @hashKey()
  id: string;

  @attribute()
  name: string;

  @attribute()
  tokenId: number;

  @attribute()
  priceBought: number;

  @attribute()
  priceSold: number | null;

  @attribute()
  dateBought: number;

  @attribute()
  dateSold: number | null;

  @attribute()
  isSold: boolean;

  @attribute()
  feeBought: number;

  @attribute()
  feeSold: number | null;

  @attribute()
  url: string;

  @attribute()
  methodBought: MethodBought;

  @attribute()
  methodSold: MethodSold;
}