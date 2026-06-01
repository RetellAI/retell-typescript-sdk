# MCP AWS Rollout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Provision or verify AWS resources for `https://mcp.retellai.com/` and perform the production rollout.

**Architecture:** Reuse Retell's public ECS/Fargate deployment pattern. Route `mcp.retellai.com` through a public ALB host rule to a dedicated target group backed by the independent `retell-mcp-server-service` ECS service.

**Tech Stack:** AWS CLI, ECS Fargate, ECR, ALB, ACM, Route53, CloudWatch, GitHub Actions.

---

## File Structure

- Create: `docs/mcp-self-hosting-runbook.md`
  - Responsibility: records the AWS resources selected for the MCP rollout and the exact commands used.

This plan does not change runtime code.

### Task 1: Create AWS Rollout Runbook

**Files:**
- Create: `docs/mcp-self-hosting-runbook.md`

- [ ] **Step 1: Create the runbook with fixed service constants**

Create `docs/mcp-self-hosting-runbook.md` with exactly:

```markdown
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
```

- [ ] **Step 2: Commit the runbook skeleton**

Run:

```bash
git add docs/mcp-self-hosting-runbook.md
git commit -m "docs: add MCP AWS rollout runbook"
```

Expected: one commit with only `docs/mcp-self-hosting-runbook.md` changed.

### Task 2: Discover Existing AWS Resources

**Files:**
- Modify: `docs/mcp-self-hosting-runbook.md`

- [ ] **Step 1: Confirm AWS caller identity**

Run:

```bash
aws sts get-caller-identity --output json
```

Expected: JSON includes `Account`.

- [ ] **Step 2: List public ALB candidates**

Run:

```bash
aws elbv2 describe-load-balancers \
  --region us-west-2 \
  --query 'LoadBalancers[?Scheme==`internet-facing`].[LoadBalancerName,LoadBalancerArn,DNSName,VpcId]' \
  --output table
```

Expected: at least one internet-facing ALB candidate.

- [ ] **Step 3: Pick the public ALB used by Retell public services**

Run this for each candidate ALB ARN:

```bash
aws elbv2 describe-listeners \
  --region us-west-2 \
  --load-balancer-arn "$ALB_ARN" \
  --query 'Listeners[*].[Port,Protocol,ListenerArn]' \
  --output table
```

Expected: selected ALB has an HTTPS listener on port `443`.

- [ ] **Step 4: Find private subnets in the selected VPC**

Run after setting `VPC_ID` to the selected ALB VPC:

```bash
aws ec2 describe-subnets \
  --region us-west-2 \
  --filters "Name=vpc-id,Values=$VPC_ID" \
  --query 'Subnets[*].[SubnetId,AvailabilityZone,MapPublicIpOnLaunch,Tags[?Key==`Name`].Value|[0]]' \
  --output table
```

Expected: select at least two subnets where `MapPublicIpOnLaunch` is `False`.

- [ ] **Step 5: Record selected values**

Edit `docs/mcp-self-hosting-runbook.md` and fill the `Selected AWS Resources` block with the account, ALB, VPC, and subnet values selected from the commands above.

- [ ] **Step 6: Commit discovery notes**

Run:

```bash
git add docs/mcp-self-hosting-runbook.md
git commit -m "docs: record MCP AWS resource selections"
```

Expected: one commit with runbook values recorded.

### Task 3: Provision ECS Network Resources

**Files:**
- Modify: `docs/mcp-self-hosting-runbook.md`

- [ ] **Step 1: Create MCP task security group**

Run after setting `VPC_ID` and `ALB_SECURITY_GROUP_ID`:

```bash
MCP_TASK_SG_ID="$(aws ec2 create-security-group \
  --region us-west-2 \
  --group-name retell-mcp-server-tasks \
  --description 'Retell MCP server ECS tasks' \
  --vpc-id "$VPC_ID" \
  --query 'GroupId' \
  --output text)"

aws ec2 authorize-security-group-ingress \
  --region us-west-2 \
  --group-id "$MCP_TASK_SG_ID" \
  --protocol tcp \
  --port 3000 \
  --source-group "$ALB_SECURITY_GROUP_ID"

echo "$MCP_TASK_SG_ID"
```

Expected: outputs a security group ID starting with `sg-`.

- [ ] **Step 2: Create target group**

Run:

```bash
MCP_TARGET_GROUP_ARN="$(aws elbv2 create-target-group \
  --region us-west-2 \
  --name retell-mcp-server \
  --protocol HTTP \
  --port 3000 \
  --vpc-id "$VPC_ID" \
  --target-type ip \
  --health-check-protocol HTTP \
  --health-check-path /health \
  --matcher HttpCode=200 \
  --query 'TargetGroups[0].TargetGroupArn' \
  --output text)"

echo "$MCP_TARGET_GROUP_ARN"
```

Expected: outputs an ALB target group ARN.

- [ ] **Step 3: Create ECS cluster**

Run:

```bash
aws ecs describe-clusters --region us-west-2 --clusters retell-mcp-server \
  --query 'clusters[0].clusterName' --output text 2>/dev/null | grep -q '^retell-mcp-server$' || \
  aws ecs create-cluster --region us-west-2 --cluster-name retell-mcp-server
```

Expected: command exits successfully.

- [ ] **Step 4: Record provisioned resources**

Edit `docs/mcp-self-hosting-runbook.md` and fill:

```txt
MCP task security group:
MCP target group ARN:
```

- [ ] **Step 5: Commit provisioned resource notes**

Run:

```bash
git add docs/mcp-self-hosting-runbook.md
git commit -m "docs: record MCP ECS network resources"
```

Expected: one runbook commit.

### Task 4: Wire ALB, DNS, and ECS Service

**Files:**
- Modify: `docs/mcp-self-hosting-runbook.md`

- [ ] **Step 1: Confirm or request ACM certificate coverage**

Run:

```bash
aws acm list-certificates \
  --region us-west-2 \
  --certificate-statuses ISSUED \
  --query 'CertificateSummaryList[*].[DomainName,CertificateArn]' \
  --output table
```

Expected: selected certificate covers `mcp.retellai.com` directly or through `*.retellai.com`.

- [ ] **Step 2: Add ALB listener rule**

Run after setting `HTTPS_LISTENER_ARN` and `MCP_TARGET_GROUP_ARN`:

```bash
aws elbv2 create-rule \
  --region us-west-2 \
  --listener-arn "$HTTPS_LISTENER_ARN" \
  --priority 73 \
  --conditions Field=host-header,Values=mcp.retellai.com \
  --actions Type=forward,TargetGroupArn="$MCP_TARGET_GROUP_ARN"
```

Expected: command returns a listener rule ARN.

- [ ] **Step 3: Register first task definition revision**

Run from the SDK repo after `ecs/mcp/task-def-mcp-server.json` has merged:

```bash
aws ecs register-task-definition \
  --region us-west-2 \
  --cli-input-json file://ecs/mcp/task-def-mcp-server.json
```

Expected: command returns a task definition ARN for family `retell-mcp-server`.

- [ ] **Step 4: Create ECS service**

Run after setting `PRIVATE_SUBNET_IDS_CSV`, `MCP_TASK_SG_ID`, and `MCP_TARGET_GROUP_ARN`:

```bash
aws ecs create-service \
  --region us-west-2 \
  --cluster retell-mcp-server \
  --service-name retell-mcp-server-service \
  --task-definition retell-mcp-server \
  --desired-count 2 \
  --launch-type FARGATE \
  --platform-version LATEST \
  --network-configuration "awsvpcConfiguration={subnets=[$PRIVATE_SUBNET_IDS_CSV],securityGroups=[$MCP_TASK_SG_ID],assignPublicIp=DISABLED}" \
  --load-balancers "targetGroupArn=$MCP_TARGET_GROUP_ARN,containerName=retell-mcp-server,containerPort=3000" \
  --health-check-grace-period-seconds 60
```

Expected: command returns service `retell-mcp-server-service`.

- [ ] **Step 5: Create or update Route53 record**

Run after setting `HOSTED_ZONE_ID` and `ALB_DNS_NAME`:

```bash
cat >/tmp/mcp-retellai-route53.json <<JSON
{
  "Comment": "Route mcp.retellai.com to Retell public ALB",
  "Changes": [
    {
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "mcp.retellai.com",
        "Type": "CNAME",
        "TTL": 60,
        "ResourceRecords": [
          {
            "Value": "$ALB_DNS_NAME"
          }
        ]
      }
    }
  ]
}
JSON

aws route53 change-resource-record-sets \
  --hosted-zone-id "$HOSTED_ZONE_ID" \
  --change-batch file:///tmp/mcp-retellai-route53.json
```

Expected: command returns a Route53 change ID.

- [ ] **Step 6: Commit final AWS notes**

Run:

```bash
git add docs/mcp-self-hosting-runbook.md
git commit -m "docs: record MCP ALB and DNS rollout"
```

Expected: one runbook commit.

### Task 5: Production Deploy and Smoke Test

**Files:**
- Verify only.

- [ ] **Step 1: Configure GitHub Actions secret**

In `RetellAI/retell-typescript-sdk`, configure repository secret:

```txt
AWS_ROLE_ARN
```

Expected: secret exists and trusts GitHub OIDC for this repo.

- [ ] **Step 2: Trigger deploy workflow**

Run after explicit approval for remote workflow dispatch:

```bash
gh workflow run deploy-mcp-server.yml --repo RetellAI/retell-typescript-sdk --ref main
```

Expected: workflow starts.

- [ ] **Step 3: Wait for workflow success**

Run:

```bash
gh run list --repo RetellAI/retell-typescript-sdk --workflow deploy-mcp-server.yml --limit 1
```

Expected: latest run reaches `completed` with conclusion `success`.

- [ ] **Step 4: Verify ECS service stability**

Run:

```bash
aws ecs wait services-stable \
  --region us-west-2 \
  --cluster retell-mcp-server \
  --services retell-mcp-server-service
```

Expected: command exits successfully.

- [ ] **Step 5: Verify public health endpoint**

Run:

```bash
curl -fsS https://mcp.retellai.com/health
```

Expected:

```txt
OK
```

- [ ] **Step 6: Verify MCP invalid-auth behavior**

Run:

```bash
curl -fsS -X POST https://mcp.retellai.com/ \
  -H 'content-type: application/json' \
  --data '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"smoke-test","version":"0.0.1"}}}' \
  || true
```

Expected: request does not return a `2xx` success for authenticated tool usage without a Retell API key.

- [ ] **Step 7: Verify CloudWatch logs redact key headers**

Run:

```bash
aws logs filter-log-events \
  --region us-west-2 \
  --log-group-name /ecs/retell-mcp-server \
  --filter-pattern '"[REDACTED]"' \
  --max-items 5
```

Expected: recent request logs show redacted sensitive headers, and no raw Retell API key appears.

