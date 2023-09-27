#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AccCanOrchestratorInfrastructureStack } from "../lib/acc-can-orchestrator-app.infrastructure-stack";
import { configuration } from "./configuration";

const app = new cdk.App();

const buildEnv = app.node.tryGetContext("env").trim().toLowerCase();

new AccCanOrchestratorInfrastructureStack(
  app,
  `acc-can-orchestrator-${buildEnv}`,
  configuration[buildEnv]
);
