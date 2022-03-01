// CONSTRUCTS
import { Construct } from "constructs";
import { ConstructWithAppScope } from "lib/nft_collection_serverless-stack";

// API GATEWAY TYPES 
import { 
  IModel, 
  Integration, 
  IntegrationProps, 
  IResource, 
  IRestApi, 
  JsonSchemaType, 
  JsonSchemaVersion, 
  MethodOptions, 
  MethodProps, 
  MethodResponse, 
  ModelProps, 
  ResourceProps 
} from "aws-cdk-lib/aws-apigateway";

// COMPONENTS
import { 
  ApiMethod, 
  ApiModel, 
  ApiResource 
} from "../../Components/APIGateway/APIGateway.models";

// COMMON PROPS
import { 
  COMMON_API_METHOD_PROPS, 
  COMMON_INTEGRATION_PROPS, 
  COMMON_INTEGRATION_RESPONSES, 
  COMMON_METHOD_RESPONSES 
} from "../../Components/APIGateway/APIGateway.props";



export class AddNFTApiResource extends ApiResource {
  constructor(scope: Construct, parent: IResource) {
    const API_RESOURCE_PROPS: ResourceProps = {
      parent,
      pathPart: 'addNFT'
    };

    super(scope, API_RESOURCE_PROPS);
  };
};

export class AddNFTApiMethod extends ApiMethod {
  constructor(scope: ConstructWithAppScope, resource: IResource, requestModel: IModel, lambdaArn: string) {
    const methodResponses: MethodResponse[] = COMMON_METHOD_RESPONSES;
    const requestModels = {
      'application/json': requestModel
    };

    const requestTemplates = {
      'application/json': '$input.body'
    };

    const integrationProps: IntegrationProps = {
      ...COMMON_INTEGRATION_PROPS,
      options: {
        integrationResponses: COMMON_INTEGRATION_RESPONSES,
        requestTemplates
      },
      uri: `arn:aws:apigateway:${scope.region}:lambda:path/2015-03-31/functions/${lambdaArn}/invocations`
    };

    const integration = new Integration(integrationProps);

    const options: MethodOptions = {
      ...COMMON_API_METHOD_PROPS.options,
      methodResponses,
      operationName: 'AddNFT',
      requestModels
    };

    const API_METHOD_PROPS: MethodProps = {
      httpMethod: 'POST',
      resource,
      integration,
      options
    };

    super(scope, API_METHOD_PROPS);
  };
};

export class AddNFTApiModel extends ApiModel {
  constructor(scope: Construct, restApi: IRestApi) {
    const COMPLETE_MODEL_PROPS: ModelProps = {
      restApi,
      contentType: 'application/json',
      modelName: 'AddNFTRequestModel',
      schema: {
        schema: JsonSchemaVersion.DRAFT4,
        description: 'Schema for AddNFT request model',
        title: 'AddNFTRequestSchema',
        type: JsonSchemaType.OBJECT,
        properties: {
          'id': {
            type: JsonSchemaType.STRING
          },
          'name': {
            type: JsonSchemaType.STRING
          },
          'tokenId': {
            type: JsonSchemaType.NUMBER
          },
          'priceBought': {
            type: JsonSchemaType.NUMBER
          },
          'dateBought': {
            type: JsonSchemaType.NUMBER
          },
          'feeBought': {
            type: JsonSchemaType.NUMBER
          },
          'url': {
            type: JsonSchemaType.STRING
          },
          'methodBought': {
            type: JsonSchemaType.STRING
          }
        }
      }
    };
    super(scope, COMPLETE_MODEL_PROPS);
  };
};