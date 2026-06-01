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
ACM certificate ARN: not yet available for mcp.retellai.com
Route53 hosted zone ID: Z03671293OHPNOEBDIVJP
GitHub AWS role secret configured:
```

## Discovery Notes

- AWS caller identity: `arn:aws:iam::393287594714:user/rogersxie`.
- Selected `cpu-api-lb` because it is the existing public ALB for `api.retellai.com` style traffic in the target VPC.
- `cpu-api-lb` HTTPS listener: `arn:aws:elasticloadbalancing:us-west-2:393287594714:listener/app/cpu-api-lb/d09449d5f21bdd2a/8fe02377e55f7df1`.
- Existing `cpu-api-service-stable` ECS service runs in the selected four `subnet-ecs*` private subnets with `assignPublicIp=DISABLED`; MCP should mirror that network shape.
- Existing issued ACM certificates in `us-west-2` do not currently include `mcp.retellai.com` or `*.retellai.com`. A new `mcp.retellai.com` certificate is required before adding the HTTPS host rule.
- `mcp.retellai.com` does not currently have a Route53 record in hosted zone `Z03671293OHPNOEBDIVJP`.

## Rollout Notes

- MCP ECS tasks must run in private subnets with no public task IP.
- Inbound task traffic must allow TCP `3000` only from the ALB security group.
- The ECS task must not receive `RETELL_API_KEY` through environment variables or secrets.
- ALB health check path must be `/health`.
- MCP traffic path is `Internet -> public ALB -> mcp.retellai.com host rule -> MCP target group -> ECS task port 3000`.
