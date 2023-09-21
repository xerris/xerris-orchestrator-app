import { Environment } from "aws-cdk-lib";

export interface Configuration {
  readonly stageName: string;
  readonly certificateArn: string;
  readonly env: Environment;
}

const commonConfig = {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
};

export const configuration: { [key: string]: Configuration } = {
  ["production"]: {
    ...commonConfig,
    stageName: "production",
    certificateArn:
      "arn:aws:acm:us-east-1:213309327513:certificate/1aa83ad0-eb94-4ef6-a18a-05ad250dfebc",
  },
};
