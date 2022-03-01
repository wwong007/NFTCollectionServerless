// CDK LIBS
import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Permission } from 'aws-cdk-lib/aws-lambda';
import { ServicePrincipal } from 'aws-cdk-lib/aws-iam';

// CONSTRUCT
import { Construct } from 'constructs';

// RESOURCES
import { 
  AddNFTApiMethod, 
  AddNFTApiModel, 
  AddNFTApiResource 
} from './Resources/APIGateway/APIGatewayAddNFT';

import { 
  GetNFTCollectionApiMethod, 
  NFTCollectionApi, 
  NFTCollectionApiDeployment, 
  NFTCollectionApiKey, 
  NFTCollectionApiResource, 
  NFTCollectionApiUsagePlan 
} from './Resources/APIGateway/APIGatewayNFTCollection';

import { 
  UpdateNFTApiMethod, 
  UpdateNFTApiModel, 
  UpdateNFTApiResource 
} from './Resources/APIGateway/APIGatewayUpdateNFT';

import { GetNFTCollectionLambda } from './Resources/Lambda/LambdaGetNFTCollection';
import { UpdateNFTLambda } from './Resources/Lambda/LambdaUpdateNFT';
import { AddNFTLambda } from './Resources/Lambda/LambdaAddNFT';



export type ConstructWithAppScope = Construct & {
  account: string;
  region: string;
}

export class NftCollectionServerlessStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    // LAMBDA AND ARN
    const getNFTCollection = new GetNFTCollectionLambda(this);
    const getNFTCollectionArn = getNFTCollection.functionArn;
    const addNFT = new AddNFTLambda(this);
    const addNFTArn = addNFT.functionArn;
    const updateNFT = new UpdateNFTLambda(this);
    const updateNFTArn = updateNFT.functionArn;

    // REST API
    const restApi = new NFTCollectionApi(this);
    restApi.root.addMethod('ANY');
    const { root, restApiId, deploymentStage } = restApi;

    // API RESOURCES
    const getNFTCollectionResource = new NFTCollectionApiResource(this, root);
    const addNFTResource = new AddNFTApiResource(this, root);
    const updateNFTResource = new UpdateNFTApiResource(this, root);

    // REQUEST MODELS
    const addNFTRequestModel = new AddNFTApiModel(this, restApi);
    const updateNFTRequestModel = new UpdateNFTApiModel(this, restApi);

    // API METHODS
    new GetNFTCollectionApiMethod(this, getNFTCollectionResource, getNFTCollectionArn);
    new AddNFTApiMethod(this, addNFTResource, addNFTRequestModel, addNFTArn);
    new UpdateNFTApiMethod(this, updateNFTResource, updateNFTRequestModel, updateNFTArn);

    // API DEPLOYMENT
    new NFTCollectionApiDeployment(this, restApi);

    // API KEY & USAGE PLAN
    new NFTCollectionApiKey(this, restApi);
    new NFTCollectionApiUsagePlan(this, restApi, deploymentStage);

    // PERMISSION PROPS
    const permissionProps: Permission = {
      principal: new ServicePrincipal('apigateway.amazonaws.com'),
      action: 'lambda:InvokeFunction',
      sourceArn: `arn:aws:execute-api:${this.region}:${this.account}:${restApiId}/*`
    };

    // APPENDING PERMISSION TO LAMBDA
    getNFTCollection.addPermission('InvokePermission', permissionProps);
    addNFT.addPermission('InvokePermission', permissionProps);
    updateNFT.addPermission('InvokePermission', permissionProps);
  };
};
