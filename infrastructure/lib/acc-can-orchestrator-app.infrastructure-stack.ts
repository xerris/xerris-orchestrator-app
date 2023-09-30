import * as cdk from "aws-cdk-lib";
import {
  aws_s3 as s3,
  aws_cloudfront as cloudFront,
  aws_s3_deployment as s3deploy,
  aws_iam as iam,
  RemovalPolicy,
} from "aws-cdk-lib";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Construct } from "constructs";
import { Configuration } from "./configuration";

const ACCOLITE_RESOURCE_NAME = "acc-can-orchestrator";

export class AccCanOrchestratorInfrastructureStack extends cdk.Stack {
  config: Configuration;

  constructor(scope: Construct, id: string, config: Configuration) {
    super(scope, id, { env: config.env });
    this.config = config;

    const orchestratorBucket = new s3.Bucket(
      this,
      `${ACCOLITE_RESOURCE_NAME}-s3site-${this.config.stageName}`,
      {
        versioned: true,
        bucketName: `${ACCOLITE_RESOURCE_NAME}-s3site-${this.config.stageName}`,
        publicReadAccess: false,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        removalPolicy: RemovalPolicy.DESTROY,
      }
    );

    const cloudFrontOAI = new cloudFront.OriginAccessIdentity(
      this,
      `${ACCOLITE_RESOURCE_NAME}-cloudFront-OAI-${this.config.stageName}`
    );

    orchestratorBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [orchestratorBucket.arnForObjects("*")],
        principals: [
          new iam.CanonicalUserPrincipal(
            cloudFrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      })
    );

    const orchestratorCDN = new cloudFront.Distribution(
      this,
      `${ACCOLITE_RESOURCE_NAME}-cf-distribution-${this.config.stageName}`,
      {
        defaultRootObject: "index.html",
        defaultBehavior: {
          origin: new S3Origin(orchestratorBucket, {
            // give cloudfront access to s3 bucket
            originAccessIdentity: cloudFrontOAI,
          }),
          viewerProtocolPolicy:
            cloudFront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        comment: `${this.config.stageName}-${ACCOLITE_RESOURCE_NAME} - CloudFront Distribution`,
      }
    );

    new s3deploy.BucketDeployment(
      this,
      `${ACCOLITE_RESOURCE_NAME}-bucket-deployment-${this.config.stageName}`,
      {
        sources: [s3deploy.Source.asset("../dist")],
        destinationBucket: orchestratorBucket,
        distribution: orchestratorCDN,
        distributionPaths: ["/*"],
      }
    );

    new cdk.CfnOutput(this, "CloudFront URL", {
      value: orchestratorCDN.distributionDomainName,
    });
  }
}
