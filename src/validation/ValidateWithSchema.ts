// AJV
import * as Ajv from 'ajv';

// SCHEMA CLASS
import { TopLevelSchema } from './SchemaCheck';



export type ValidationFn<T> = (input: unknown) => input is T;
export function validateInputWithSchema<T, P> (input: unknown, schema: TopLevelSchema<P>): input is T {
  try {
    const ajv = new Ajv();
    const validateFunction: Ajv.ValidateFunction = ajv.compile(schema);
    const isValid = validateFunction(input);
    if (!isValid && validateFunction.errors) {
      throw new Ajv.ValidationError(validateFunction.errors);
    };
    return true;
  } catch (error) {
    console.log('Ajv validation of a request failed');
    throw error;
  };
};

export function validateInputArrayWithSchema<T, P> (input: unknown[], schema: TopLevelSchema<P>): input is T[] {
  for (let element of input) {
    validateInputWithSchema(element, schema);
  };
  return true;
};

function getInvalidKeys(validKeys: string[], inputKeys: string[]): string[] {
  return inputKeys.filter(k => !validKeys.includes(k));
};

export function removeInvalidProperties<T extends object, P>(input: T, schema: TopLevelSchema<P>): T {
  const inputKeys = Object.keys(input);
  const validKeys = Object.keys(schema.properties);

  const temp: any = Object.assign({}, input);

  if (inputKeys.length > validKeys.length) {
    const invalidKeys: string[] = getInvalidKeys(validKeys, inputKeys);
    for (const key of invalidKeys) {
      delete temp[key];
    }
  };
  return temp
}