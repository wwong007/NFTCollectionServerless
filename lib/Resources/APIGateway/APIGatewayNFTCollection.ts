// CONSTRUCTS
import { Construct } from "constructs";
import { ConstructWithAppScope } from "lib/nft_collection_serverless-stack";

// API GATEWAY TYPES
import { 
  ApiKeyProps, 
  DeploymentProps, 
  Integration, 
  IntegrationProps, 
  IResource, 
  IRestApi, 
  MethodOptions, 
  MethodProps, 
  MethodResponse, 
  Period, 
  QuotaSettings, 
  ResourceProps, 
  RestApi, 
  RestApiProps, 
  Stage, 
  ThrottleSettings, 
  UsagePlanPerApiStage, 
  UsagePlanProps 
} from "aws-cdk-lib/aws-apigateway";

// COMPONENTS
import { 
  ApiDeployment, 
  ApiGateway, 
  ApiKeyConstruct, 
  ApiMethod, 
  ApiResource, 
  ApiUsagePlan 
} from "../../Components/APIGateway/APIGateway.models";

// COMMON PROPS
import { 
  COMMON_API_METHOD_PROPS, 
  COMMON_INTEGRATION_PROPS, 
  COMMON_INTEGRATION_RESPONSES, 
  COMMON_METHOD_RESPONSES, 
  COMMON_REST_API_PROPS 
} from "../../Components/APIGateway/APIGateway.props";



// CONSTANTS
const LIMIT: number = 10000;
const BURST_LIMIT: number = 50;
const RATE_LIMIT: number = 100;

export class NFTCollectionApi extends ApiGateway {
  constructor(scope: Construct) {
    const REST_API_PROPS: RestApiProps = {
      ...COMMON_REST_API_PROPS,
      restApiName: 'NFTCollectionApiGateway',
      retainDeployments: false,
      deployOptions: {
        stageName: 'dev'
      }
    };
    super(scope, REST_API_PROPS);
  };
};

export class NFTCollectionApiResource extends ApiResource {
  constructor(scope: Construct, parent: IResource) {
    const API_RESOURCE_PROPS: ResourceProps = {
      parent,
      pathPart: 'nftCollection'
    };
    super(scope, API_RESOURCE_PROPS);
  };
};

export class GetNFTCollectionApiMethod extends ApiMethod {
  constructor(scope: ConstructWithAppScope, resource: IResource, lambdaArn: string) {
    const methodResponses: MethodResponse[] = COMMON_METHOD_RESPONSES;
    const integrationProps: IntegrationProps = {
      ...COMMON_INTEGRATION_PROPS,
      options: {
        integrationResponses: COMMON_INTEGRATION_RESPONSES
      },
      uri: `arn:aws:apigateway:${scope.region}:lambda:path/2015-03-31/functions/${lambdaArn}/invocations`
    };

    const integration = new Integration(integrationProps);

    const options: MethodOptions = {
      ...COMMON_API_METHOD_PROPS.options,
      methodResponses,
      operationName: 'GetNFTCollection'
    };

    const API_METHOD_PROPS: MethodProps = {
      httpMethod: 'GET',
      resource,
      integration,
      options
    };
    super(scope, API_METHOD_PROPS);
  };
};

export class NFTCollectionApiDeployment extends ApiDeployment {
  constructor(scope: Construct, api: IRestApi) {
    const COMPLETE_DEPLOYMENT_PROPS: DeploymentProps = {
      api,
      retainDeployments: false,
      description: 'NFTCollectionApiGateway'
    };
    super(scope, COMPLETE_DEPLOYMENT_PROPS);
  };
};

export class NFTCollectionApiKey extends ApiKeyConstruct {
  constructor(scope: Construct, resource: RestApi) {
    const COMPLETE_API_KEY_PROPS: ApiKeyProps = {
      apiKeyName: 'NFTCollectionApiKey',
      enabled: true,
      resources: [resource]
    };
    super(scope, COMPLETE_API_KEY_PROPS);
  };
};

export class NFTCollectionApiUsagePlan extends ApiUsagePlan {
  constructor(scope: Construct, api: IRestApi, stage: Stage) {
    const apiStages: UsagePlanPerApiStage[] = [
      {
        api,
        stage
      }
    ];

    const quota: QuotaSettings = {
      limit: LIMIT,
      period: Period.DAY
    };

    const throttle: ThrottleSettings = {
      burstLimit: BURST_LIMIT,
      rateLimit: RATE_LIMIT
    };

    const COMPLETE_USAGE_PLAN__PROPS: UsagePlanProps = {
      apiStages,
      name: 'NFTCollectionUsagePlan',
      quota,
      throttle
    };

    super(scope, COMPLETE_USAGE_PLAN__PROPS);
  };
};