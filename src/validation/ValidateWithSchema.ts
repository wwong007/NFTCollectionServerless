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