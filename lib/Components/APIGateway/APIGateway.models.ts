import { ApiKeySourceType, 
  AuthorizationType, 
  IntegrationProps, 
  IntegrationResponse, 
  IntegrationType, 
  MethodProps, 
  MethodResponse, 
  RestApiProps 
} from "aws-cdk-lib/aws-apigateway";

const ERROR_MAPPING_RESPONSE_TEMPLATE = "$input.path('$.errorMessage');";

export const COMMON_REST_API_PROPS: RestApiProps = {
  apiKeySourceType: ApiKeySourceType.HEADER
};

export const COMMON_API_METHOD_PROPS: Partial<MethodProps> = {
  options: {
    apiKeyRequired: true,
    authorizationType: AuthorizationType.NONE
  }
};


export const COMMON_INTEGRATION_PROPS: IntegrationProps = {
  type: IntegrationType.AWS,
  integrationHttpMethod: 'POST'
};

export const COMMON_INTEGRATION_RESPONSES: IntegrationResponse[] = [
  {
    statusCode: '200'
  },
  {
    statusCode: '400',
    selectionPattern: '.*BadRequest.*',
    responseTemplates: {
      'application/json': ERROR_MAPPING_RESPONSE_TEMPLATE
    }
  },
  {
    statusCode: '404',
    selectionPattern: '.*NotFound.*',
    responseTemplates: {
      'application/json': ERROR_MAPPING_RESPONSE_TEMPLATE
    }
  },
  {
    statusCode: '409',
    selectionPattern: '.*Conflict.*',
    responseTemplates: {
      'application/json': ERROR_MAPPING_RESPONSE_TEMPLATE
    }
  },
  {
    statusCode: '500',
    selectionPattern: '.*InternalServerError.*',
    responseTemplates: {
      'application/json': ERROR_MAPPING_RESPONSE_TEMPLATE
    }
  }
];

export const COMMON_METHOD_RESPONSES: MethodResponse[] = [
  { statusCode: '200' },
  { statusCode: '400' },
  { statusCode: '404' },
  { statusCode: '409' },
  { statusCode: '500' },
];