import { DynamoDBErrorType } from "aws/DynamoDB/DynamoMapper";
import { ServiceError, ServiceErrorType } from "./ServiceError";


export class LambdaToGatewayError extends Error {
  public name: ServiceErrorType;

  constructor(error: ServiceError | Error, context: { awsRequestId: string }) {
    super();

    const { message } = error;
    if (error instanceof ServiceError) {
      this.name = error.name;
    } else if (error.name === DynamoDBErrorType.ITEM_NOT_FOUND) {
      this.name = ServiceErrorType.NOT_FOUND;
    } else if (error.name === DynamoDBErrorType.CONDITIONAL_CHECK_FAILED) {
      this.name = ServiceErrorType.CONFLICT
    } else {
      this.name = ServiceErrorType.INTERNAL_SERVER_ERROR;
      this.message = 'Encountered unexpected runtime error'
    };
    this.message = JSON.stringify({ errorType: error.name, message, requestId: context.awsRequestId });
  };
};

