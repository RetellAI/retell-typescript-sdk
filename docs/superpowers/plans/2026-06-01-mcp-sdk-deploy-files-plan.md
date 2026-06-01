# MCP SDK Deploy Files Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the production SDK repo files needed to build and deploy the Retell MCP server to ECS.

**Architecture:** Add one ECS task definition and one GitHub Actions deploy workflow. The workflow builds `packages/mcp-server/Dockerfile`, pushes the image to ECR, renders the task definition, deploys ECS service `retell-mcp-server-service`, and smoke-tests `https://mcp.retellai.com/health`.

**Tech Stack:** GitHub Actions, AWS ECR, AWS ECS Fargate, Docker, Node 24, Deno 2.7.1, Retell MCP server.

---

## File Structure

- Modify: `packages/mcp-server/Dockerfile`
  - Responsibility: builds the MCP server container.
  - Change: install `curl` in the runtime image so the ECS container health check can call `/health`.
- Create: `ecs/mcp/task-def-mcp-server.json`
  - Responsibility: ECS Fargate task definition contract for the MCP service.
- Create: `.github/workflows/deploy-mcp-server.yml`
  - Responsibility: build, push, deploy, and smoke-test the MCP ECS service.

### Task 1: Make the Docker Image Compatible With ECS Health Checks

**Files:**

- Modify: `packages/mcp-server/Dockerfile`

- [ ] **Step 1: Update the runtime package install**

Change this line:

```dockerfile
RUN apk add --no-cache nodejs npm
```

to:

```dockerfile
RUN apk add --no-cache nodejs npm curl
```

- [ ] **Step 2: Build the image locally**

Run:

```bash
docker build --platform linux/amd64 -f packages/mcp-server/Dockerfile -t retell-mcp-server:local .
```

Expected: build exits successfully and creates image `retell-mcp-server:local`.

- [ ] **Step 3: Verify curl exists inside the image**

Run:

```bash
docker run --rm retell-mcp-server:local sh -lc 'curl --version | head -n 1'
```

Expected output starts with:

```txt
curl
```

- [ ] **Step 4: Commit Dockerfile change**

Run:

```bash
git add packages/mcp-server/Dockerfile
git commit -m "build: add curl to MCP server image"
```

Expected: one commit with only `packages/mcp-server/Dockerfile` changed.

### Task 2: Add ECS Task Definition

**Files:**

- Create: `ecs/mcp/task-def-mcp-server.json`

- [ ] **Step 1: Create the ECS task definition file**

Create `ecs/mcp/task-def-mcp-server.json` with exactly:

```json
{
  "family": "retell-mcp-server",
  "taskRoleArn": "arn:aws:iam::393287594714:role/ecsTaskExecutionRole",
  "executionRoleArn": "arn:aws:iam::393287594714:role/ecsTaskExecutionRole",
  "networkMode": "awsvpc",
  "containerDefinitions": [
    {
      "name": "retell-mcp-server",
      "image": "393287594714.dkr.ecr.us-west-2.amazonaws.com/retell-mcp-server:bootstrap",
      "cpu": 0,
      "portMappings": [
        {
          "name": "retell-mcp-server-3000-tcp",
          "containerPort": 3000,
          "hostPort": 3000,
          "protocol": "tcp",
          "appProtocol": "http"
        }
      ],
      "essential": true,
      "command": ["--transport=http", "--port=3000"],
      "environment": [],
      "secrets": [],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/retell-mcp-server",
          "awslogs-region": "us-west-2",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost:3000/health || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 30
      }
    }
  ],
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "1024",
  "memory": "4096",
  "runtimePlatform": {
    "cpuArchitecture": "X86_64",
    "operatingSystemFamily": "LINUX"
  }
}
```

- [ ] **Step 2: Validate JSON syntax**

Run:

```bash
node -e 'JSON.parse(require("fs").readFileSync("ecs/mcp/task-def-mcp-server.json", "utf8")); console.log("json ok")'
```

Expected:

```txt
json ok
```

- [ ] **Step 3: Verify no shared Retell API key is configured**

Run:

```bash
node -e 'const t=require("./ecs/mcp/task-def-mcp-server.json"); const c=t.containerDefinitions[0]; if ((c.environment||[]).some(e=>/RETELL_API_KEY/.test(e.name)) || (c.secrets||[]).some(e=>/RETELL_API_KEY/.test(e.name))) process.exit(1); console.log("no shared Retell API key")'
```

Expected:

```txt
no shared Retell API key
```

- [ ] **Step 4: Commit task definition**

Run:

```bash
git add ecs/mcp/task-def-mcp-server.json
git commit -m "chore: add MCP ECS task definition"
```

Expected: one commit with only `ecs/mcp/task-def-mcp-server.json` changed.

### Task 3: Add GitHub Actions Deploy Workflow

**Files:**

- Create: `.github/workflows/deploy-mcp-server.yml`

- [ ] **Step 1: Create deploy workflow**

Create `.github/workflows/deploy-mcp-server.yml` with exactly:

```yaml
name: Deploy MCP server to ECS

on:
  push:
    branches: ['main']
    paths:
      - 'packages/mcp-server/**'
      - 'src/**'
      - 'package.json'
      - 'yarn.lock'
      - 'ecs/mcp/**'
      - '.github/workflows/deploy-mcp-server.yml'
  workflow_dispatch:

concurrency:
  group: deploy-mcp-server-${{ github.ref }}
  cancel-in-progress: ${{ github.ref != 'refs/heads/main' }}

env:
  AWS_REGION: us-west-2
  ECR_REPOSITORY: retell-mcp-server
  ECS_CLUSTER: retell-mcp-server
  ECS_SERVICE: retell-mcp-server-service
  ECS_TASK_DEFINITION: ecs/mcp/task-def-mcp-server.json
  CONTAINER_NAME: retell-mcp-server
  MCP_HEALTH_URL: https://mcp.retellai.com/health

permissions:
  contents: read
  id-token: write

jobs:
  deploy:
    if: github.repository == 'RetellAI/retell-typescript-sdk'
    name: Build and deploy
    runs-on: ubuntu-latest
    timeout-minutes: 60
    environment: production

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
          aws-region: ${{ env.AWS_REGION }}
          mask-aws-account-id: 'no'

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Ensure ECR repository and log group exist
        run: |
          aws ecr describe-repositories --repository-names "$ECR_REPOSITORY" >/dev/null 2>&1 || \
            aws ecr create-repository --repository-name "$ECR_REPOSITORY" --image-scanning-configuration scanOnPush=true

          aws logs describe-log-groups --log-group-name-prefix /ecs/retell-mcp-server \
            --query 'logGroups[?logGroupName==`/ecs/retell-mcp-server`].logGroupName' \
            --output text | grep -q '^/ecs/retell-mcp-server$' || \
            aws logs create-log-group --log-group-name /ecs/retell-mcp-server

      - name: Build, tag, and push image to Amazon ECR
        id: build-image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
          DOCKER_BUILDKIT: '1'
        run: |
          IMAGE_URI="$ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG"
          docker build --platform linux/amd64 -f packages/mcp-server/Dockerfile -t "$IMAGE_URI" .
          docker push "$IMAGE_URI"
          echo "image=$IMAGE_URI" >> "$GITHUB_OUTPUT"

      - name: Fill in the new image ID in the Amazon ECS task definition
        id: task-def
        uses: aws-actions/amazon-ecs-render-task-definition@v1
        with:
          task-definition: ${{ env.ECS_TASK_DEFINITION }}
          container-name: ${{ env.CONTAINER_NAME }}
          image: ${{ steps.build-image.outputs.image }}

      - name: Deploy Amazon ECS task definition
        uses: aws-actions/amazon-ecs-deploy-task-definition@v2
        with:
          task-definition: ${{ steps.task-def.outputs.task-definition }}
          service: ${{ env.ECS_SERVICE }}
          cluster: ${{ env.ECS_CLUSTER }}
          wait-for-service-stability: true

      - name: Smoke test health endpoint
        run: |
          for attempt in 1 2 3 4 5; do
            if curl -fsS "$MCP_HEALTH_URL"; then
              exit 0
            fi
            sleep 12
          done
          exit 1
```

- [ ] **Step 2: Validate workflow YAML parses**

Run:

```bash
ruby -e 'require "yaml"; YAML.load_file(".github/workflows/deploy-mcp-server.yml"); puts "yaml ok"'
```

Expected:

```txt
yaml ok
```

- [ ] **Step 3: Verify production repo gate exists**

Run:

```bash
rg -n "github.repository == 'RetellAI/retell-typescript-sdk'" .github/workflows/deploy-mcp-server.yml
```

Expected: one match in the `deploy` job.

- [ ] **Step 4: Commit deploy workflow**

Run:

```bash
git add .github/workflows/deploy-mcp-server.yml
git commit -m "ci: add MCP ECS deploy workflow"
```

Expected: one commit with only `.github/workflows/deploy-mcp-server.yml` changed.

### Task 4: Local End-to-End Container Verification

**Files:**

- Verify only.

- [ ] **Step 1: Build the final image**

Run:

```bash
docker build --platform linux/amd64 -f packages/mcp-server/Dockerfile -t retell-mcp-server:local .
```

Expected: build exits successfully.

- [ ] **Step 2: Run the HTTP server locally**

Run:

```bash
docker run --rm -p 3000:3000 --name retell-mcp-server-local retell-mcp-server:local --transport=http --port=3000
```

Expected: container keeps running and logs that MCP Server is running on port `3000`.

- [ ] **Step 3: Health check from another terminal**

Run:

```bash
curl -fsS http://localhost:3000/health
```

Expected:

```txt
2xx response, for example {"status":"ok"}
```

- [ ] **Step 4: Stop local container**

Run:

```bash
docker stop retell-mcp-server-local
```

Expected: container stops cleanly.

### Task 5: Regeneration Preservation Verification

**Files:**

- Verify only.

- [ ] **Step 1: Confirm deploy files are in production working tree**

Run:

```bash
test -f .github/workflows/deploy-mcp-server.yml
test -f ecs/mcp/task-def-mcp-server.json
echo "deploy files present"
```

Expected:

```txt
deploy files present
```

- [ ] **Step 2: Confirm staging promote protects the deploy files**

Run:

```bash
git fetch https://github.com/RetellAI/retell-typescript-sdk-staging.git main:refs/remotes/staging/main
git show staging/main:.github/workflows/stlc-promote.yml | rg "git checkout production/main -- \\.github/workflows|task-def-mcp-server"
```

Expected:

```txt
          git checkout production/main -- .github/workflows
          if git cat-file -e "production/main:ecs/mcp/task-def-mcp-server.json" 2>/dev/null; then
            git checkout production/main -- ecs/mcp/task-def-mcp-server.json
            ecs/mcp/task-def-mcp-server.json
              ecs/mcp/task-def-mcp-server.json
```

- [ ] **Step 3: Commit no verification changes**

Run:

```bash
git status --short
```

Expected: no uncommitted files.
