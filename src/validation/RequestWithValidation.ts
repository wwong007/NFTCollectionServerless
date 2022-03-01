// CUSTOM ERROR CLASS/TYPE
import { ServiceError, ServiceErrorType } from "errors/ServiceError";
import { ValidationError } from "errors/ValidationError";



export class RequestWithValidation {
  constructor(input: unknown, inputValidationFn: (input: unknown) => boolean) {
    try {
      inputValidationFn(input);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new ServiceError(ServiceErrorType.BAD_REQUEST, error.message)
      }
      throw error;
    }
  }
}