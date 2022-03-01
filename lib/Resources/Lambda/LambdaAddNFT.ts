// SYSTEM UTIL
import * as path from 'path';

// CDK LIBS
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';

// CONSTRUCT
import { ConstructWithAppScope } from 'lib/nft_collection_serverless-stack';

// COMPONENT
import { LambdaFunction } from '../../Components/Lambda/Lambda.models';

// COMMON PROPS
import { COMMON_LAMBDA_OPTIONS } from '../../Components/Lambda/Lambda.props';




// CONSTANTS
const DIST_PATH = path.join(__dirname, '../../../build/commonjs/dist');
const FUNCTION_NAME:string = 'AddNFT';

export class AddNFTLambda extends LambdaFunction {
  constructor(scope: ConstructWithAppScope) {
    const ADD_NFT_PROPS: lambda.FunctionProps = {
      ...COMMON_LAMBDA_OPTIONS,
      code: lambda.Code.fromAsset(DIST_PATH),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: `${FUNCTION_NAME}.handler`,
      functionName: FUNCTION_NAME,
      environment: {
        ...COMMON_LAMBDA_OPTIONS.environment
      },
      initialPolicy: [
        new iam.PolicyStatement({
          actions: ['dynamodb.PutItem'],
          effect: iam.Effect.ALLOW,
          resources: [
            `arn:aws:dynamodb:${scope.region}:${scope.account}:table/NFTCollection`
          ]
        })
      ]
    };
    super(scope, ADD_NFT_PROPS);
  };
};