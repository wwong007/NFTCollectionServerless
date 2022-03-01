import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';


export type ConstructWithAppScope = Construct & {
  account: string;
  region: string;
}

export class NftCollectionServerlessStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'NftCollectionServerlessQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
