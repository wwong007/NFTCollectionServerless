// DYNAMO DB CLIENT
import * as DynamoDBClient from 'aws-sdk/clients/dynamodb';

// DYNAMODB DATA MAPPER
import { DataMapper, ExecuteUpdateExpressionOptions, PutOptions, ScanOptions } from '@aws/dynamodb-data-mapper';
import { ZeroArgumentsConstructor } from '@aws/dynamodb-data-marshaller';
import { UpdateExpression } from '@aws/dynamodb-expressions';


export const DynamoMapper = new DataMapper({
  client: new DynamoDBClient({ region: 'us-west-2' })
});

export const enum DynamoDBErrorType {
  ACCESS_DENIED = 'AccessDeniedException',
  CONDITIONAL_CHECK_FAILED = 'ConditionalCheckFailedException',
  ITEM_NOT_FOUND = 'ItemNotFoundException',
  TABLE_NOT_FOUND = 'ResourceNotFoundException'
};

export async function scan<T>(valueConstructor: ZeroArgumentsConstructor<T>, options?: ScanOptions): Promise<T[]> {
  const records: T[] = [];
  try {
    for await(const record of DynamoMapper.scan(valueConstructor, options)) {
      records.push(record);
    };
    return records;
  } catch (error) {
    throw error
  };
};

export function putItem<T>(item: T, options?: PutOptions): Promise<T> {
  try {
    return DynamoMapper.put(item, options);
  } catch (error) {
    throw error;
  };
};

export function executeUpdateExpression<T> (
  updateExpression: UpdateExpression,
  key: { [propertyName: string]: string | number | boolean },
  valueConstructor: ZeroArgumentsConstructor<T>,
  updateOptions?: ExecuteUpdateExpressionOptions
): Promise<T> {
  try {
    return DynamoMapper.executeUpdateExpression(updateExpression, key, valueConstructor, updateOptions);
  } catch (error) {
    throw error;
  };
};

