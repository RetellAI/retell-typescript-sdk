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
AWS account:
Public ALB ARN:
Public ALB DNS name:
Public ALB security group:
VPC ID:
Private subnet IDs:
MCP task security group:
MCP target group ARN:
ACM certificate ARN:
Route53 hosted zone ID:
GitHub AWS role secret configured:
```

## Rollout Notes

- MCP ECS tasks must run in private subnets with no public task IP.
- Inbound task traffic must allow TCP `3000` only from the ALB security group.
- The ECS task must not receive `RETELL_API_KEY` through environment variables or secrets.
- ALB health check path must be `/health`.
- MCP traffic path is `Internet -> public ALB -> mcp.retellai.com host rule -> MCP target group -> ECS task port 3000`.
