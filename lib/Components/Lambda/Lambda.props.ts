// AWS CDK
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Duration } from 'aws-cdk-lib';

// CONSTANTS
const DEFAULT_MEMORY_SIZE: number = 512;
const DEFAULT_TIMEOUT: number = 5;

export const COMMON_LAMBDA_OPTIONS: lambda.FunctionOptions = {
  environment: {
    AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1"
  },
  logRetention: logs.RetentionDays.ONE_YEAR,
  memorySize: DEFAULT_MEMORY_SIZE,
  timeout: Duration.seconds(DEFAULT_TIMEOUT),
  tracing: lambda.Tracing.ACTIVE
};