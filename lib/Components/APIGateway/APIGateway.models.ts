import { ApiKey, 
  ApiKeyProps, 
  Deployment, 
  DeploymentProps, 
  Method, 
  MethodProps, 
  Model, 
  ModelProps, 
  Resource, 
  ResourceProps, 
  RestApi, 
  RestApiProps, 
  UsagePlan, 
  UsagePlanProps 
} from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";



export class ApiGateway extends RestApi {
  constructor(scope: Construct, apiProps: RestApiProps) {
    super(
      scope,
      `${apiProps.restApiName}`,
      apiProps
    );
  };
};

export class ApiResource extends Resource {
  constructor(scope: Construct, resourceProps: ResourceProps) {
    super(
      scope,
      `${resourceProps.pathPart}-resource`,
      resourceProps
    );
  };
};


export class ApiDeployment extends Deployment {
  constructor(scope: Construct, deploymentProps: DeploymentProps) {
    super(
      scope,
      `${deploymentProps.description}-deployment`,
      deploymentProps
    );
  };
};

export class ApiMethod extends Method {
  constructor(scope: Construct, methodProps: MethodProps) {
    if (methodProps.options?.operationName) {
      super(
        scope,
        `${methodProps.options.operationName}-method`,
        methodProps
      );
    } else {
      super(
        scope,
        `${methodProps.resource.path}-${methodProps.httpMethod}-method`,
        methodProps
      );
    };
  };
};

export class ApiKeyConstruct extends ApiKey {
  constructor(scope: Construct, apiKeyProps: ApiKeyProps) {
    super(
      scope,
      `${apiKeyProps.apiKeyName}`,
      apiKeyProps
    );
  };
};

export class ApiUsagePlan extends UsagePlan {
  constructor(scope: Construct, usagePlanProps: UsagePlanProps) {
    super(
      scope,
      `${usagePlanProps.name}`,
      usagePlanProps
    );
  };
};

export class ApiModel extends Model {
  constructor(scope: Construct, modelProps: ModelProps) {
    super(
      scope,
      `${modelProps.modelName}`,
      modelProps
    );
  };
};