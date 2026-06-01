# MCP Self-Hosting AWS Runbook

## Fixed Service Names

- Domain: `mcp.retellai.com`
- AWS region: `us-west-2`
- ECR repository: `retell-mcp-server`
- ECS cluster: `retell-mcp-server`
- ECS service: `retell-mcp-server-service`
- ECS task family: `retell-mcp-server`
- Container name: `retell-mcp-server`
- Container port: `3000`
- CloudWatch log group: `/ecs/retell-mcp-server`

## Selected AWS Resources

Record selected values here during rollout:

```txt
AWS account: 393287594714
Public ALB ARN: arn:aws:elasticloadbalancing:us-west-2:393287594714:loadbalancer/app/cpu-api-lb/d09449d5f21bdd2a
Public ALB DNS name: cpu-api-lb-833001245.us-west-2.elb.amazonaws.com
Public ALB security group: sg-070d854183de06b8b
VPC ID: vpc-0746f45d65bb88e92
Private subnet IDs: subnet-0cae5f36e6a399ea2, subnet-0f3ecf3b33a1a54f0, subnet-032354b1274d73831, subnet-0a46d06b9536d6db9
MCP task security group: sg-054d6f1f723fd5eca
MCP target group ARN: arn:aws:elasticloadbalancing:us-west-2:393287594714:targetgroup/retell-mcp-server/47f3a108e6df52d9
ACM certificate ARN: arn:aws:acm:us-west-2:393287594714:certificate/3a169b8a-006a-4d95-9b67-7fc23c74c812
MCP HTTPS listener rule ARN: arn:aws:elasticloadbalancing:us-west-2:393287594714:listener-rule/app/cpu-api-lb/d09449d5f21bdd2a/8fe02377e55f7df1/d97608ea51c4437d
Route53 hosted zone ID: Z03671293OHPNOEBDIVJP
Bootstrap image URI: 393287594714.dkr.ecr.us-west-2.amazonaws.com/retell-mcp-server:bootstrap
Initial task definition ARN: arn:aws:ecs:us-west-2:393287594714:task-definition/retell-mcp-server:1
ECS service status: ACTIVE, 2 running / 2 desired, rollout COMPLETED
Route53 mcp.retellai.com record: CNAME cpu-api-lb-833001245.us-west-2.elb.amazonaws.com
Route53 service record change ID: /change/C006700138H7TPKN81YQN
Public health smoke test: `curl -fsS https://mcp.retellai.com/health` returned `OK`
Invalid-auth smoke test: `execute` without `RETELL_API_KEY` returned MCP `isError: true`
CloudWatch redaction check: fake `authorization` header was logged as `[REDACTED]`
GitHub AWS role secret configured: `AWS_ROLE_ARN=arn:aws:iam::393287594714:role/github-actions-deploy`
```

## Discovery Notes

- AWS caller identity: `arn:aws:iam::393287594714:user/rogersxie`.
- Selected `cpu-api-lb` because it is the existing public ALB for `api.retellai.com` style traffic in the target VPC.
- `cpu-api-lb` HTTPS listener: `arn:aws:elasticloadbalancing:us-west-2:393287594714:listener/app/cpu-api-lb/d09449d5f21bdd2a/8fe02377e55f7df1`.
- Existing `cpu-api-service-stable` ECS service runs in the selected four `subnet-ecs*` private subnets with `assignPublicIp=DISABLED`; MCP should mirror that network shape.
- Existing issued ACM certificates in `us-west-2` did not include `mcp.retellai.com` or `*.retellai.com`, so a dedicated `mcp.retellai.com` certificate was created and DNS-validated.
- ACM validation record: `_a53fd9f776cd20dec71a4534d491771c.mcp.retellai.com. CNAME _cbc6199a14649e1c933dbf8ea4e681f3.jkddzztszm.acm-validations.aws.`
- The `mcp.retellai.com` certificate is attached to the selected HTTPS listener as a non-default SNI certificate.
- The HTTPS listener has a host-header rule for `mcp.retellai.com` that forwards to the MCP target group.
- The local MCP image verified during SDK deploy-file implementation was pushed to ECR as the bootstrap image and registered as ECS task definition revision `retell-mcp-server:1`.
- The `retell-mcp-server-service` ECS service is running two healthy Fargate tasks in the selected private subnets.
- `mcp.retellai.com` is routed to the selected public ALB through a Route53 CNAME in hosted zone `Z03671293OHPNOEBDIVJP`.
- The existing `github-actions-deploy` IAM role trust policy now includes `repo:RetellAI/retell-typescript-sdk:*`, and the SDK repo has `AWS_ROLE_ARN` configured for GitHub Actions.

## Rollout Notes

- MCP ECS tasks must run in private subnets with no public task IP.
- Inbound task traffic must allow TCP `3000` only from the ALB security group.
- The ECS task must not receive `RETELL_API_KEY` through environment variables or secrets.
- ALB health check path must be `/health`.
- MCP traffic path is `Internet -> public ALB -> mcp.retellai.com host rule -> MCP target group -> ECS task port 3000`.
