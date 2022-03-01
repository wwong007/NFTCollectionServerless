import { ErrorObject } from 'ajv';

enum ValidationErrorType {
  required = 'MissingProperty',
  type = 'InvalidType',
  enum = 'InvalidEnumValue',
  minLength = 'InvalidStringLength',
  maxLength = 'InvalidStringLength',
  minimum = 'InvalidNumberValue',
  maximum = 'InvalidNumberValue'
};

export interface ValidationErrorMessageI {
  code: string;
  message: string;
  validation: object;
  schemaPath: string
};

function getValidationErrorMessageFromAjvError(ajvError: ErrorObject): ValidationErrorMessageI {
  let validationErrorMessage: ValidationErrorMessageI;
  let validationErrorType: ValidationErrorType = ValidationErrorType[ajvError.keyword as keyof typeof ValidationErrorType];
  let message: string;

  if (ajvError.dataPath === '.body') {
    message = 'request body ' + ajvError.message;
  } else {
    message = ajvError.dataPath + ' ' + ajvError.message;
  };

  validationErrorMessage = {
    "code": validationErrorType,
    "message": message,
    "validation": ajvError.params,
    "schemaPath": ajvError.schemaPath
  };

  return validationErrorMessage;
};

function getAjvErrorMessage(ajvErrors: Array<ErrorObject>): string {
  let validationErrorMessages: ValidationErrorMessageI[];
  validationErrorMessages = ajvErrors.map((error) => getValidationErrorMessageFromAjvError(error));
  return JSON.stringify(validationErrorMessages);
};

export class ValidationError extends Error {
  constructor(ajvErrors: Array<ErrorObject>) {
    super();

    this.name = 'ValidationError';
    this.message = getAjvErrorMessage(ajvErrors);
  };
};