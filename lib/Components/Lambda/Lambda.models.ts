// CDK LIB
import * as lambda from 'aws-cdk-lib/aws-lambda';

// CUSTOM CONSTRUCT TYPE
import { ConstructWithAppScope } from 'lib/nft_collection_serverless-stack';


export class LambdaFunction extends lambda.Function {
  constructor(scope: ConstructWithAppScope, functionProps: lambda.FunctionProps) {
    super(
      scope,
      `${functionProps.functionName}`,
      functionProps
    );
  };
};



