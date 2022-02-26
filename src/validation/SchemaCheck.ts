type TypeName = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'any';

export interface SchemaValueI {
  type: TypeName;
  items?: object;
  properties?: object;
  minimum?: number;
  required?: string[];
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  enum?: string[];
};

export type SchemaMappedType<T> = {
  [P in keyof T]: SchemaValueI;
};

export type TopLevelSchema<T> = {
  "$id": string;
  type: 'object';
  properties: SchemaMappedType<T>;
  required: (keyof T)[];
};