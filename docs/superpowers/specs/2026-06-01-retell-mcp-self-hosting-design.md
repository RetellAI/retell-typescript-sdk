# Retell MCP Server Self-Hosting Migration Spec

## Summary

Retell currently exposes an MCP server package generated with the TypeScript SDK. The package supports local `npx` usage and HTTP transport, but the public remote MCP runtime has depended on Stainless-hosted domain/server infrastructure. Stainless is deprecating that hosted runtime. Retell should migrate the remote MCP endpoint to Retell-owned infrastructure while preserving the existing Stainless/stls OpenAPI-to-artifact generation pipeline.

The target state is a public, developer-facing MCP endpoint at `https://mcp.retellai.com/`, hosted by Retell, backed by the existing `packages/mcp-server` runtime in this repository, and deployed as an independent ECS service.

## Goals

- Host the remote MCP runtime at `https://mcp.retellai.com/`.
- Preserve existing MCP clients' core behavior:
  - MCP Streamable HTTP endpoint at `/`.
  - Health endpoint at `/health`.
  - Tools: `search_docs` and `execute`.
  - Per-request Retell API key authentication through `Authorization: Bearer ...` or `x-retell-api-key`.
- Reuse Retell's existing backend deployment pattern: GitHub Actions builds Docker image, pushes to ECR, renders an ECS task definition, and deploys an ECS service.
- Keep the Stainless/stls SDK artifact pipeline intact. OpenAPI-to-SDK artifact generation is not part of this migration.
- Ensure deploy files survive future generated SDK release PRs if the active promotion path can delete production-only files.

## Non-Goals

- Do not replace Stainless/stls generation for SDK artifacts.
- Do not change the local `npx @retell-ai/mcp-server` path.
- Do not embed MCP runtime into the main `retell-backend` API service.
- Do not add a shared Retell API key to the MCP ECS task.
- Do not redesign the MCP tool model beyond what is needed for hosting migration.

## Current State

The MCP server lives in `packages/mcp-server`.

Current documented users are external developers and internal developers using MCP-capable AI assistants:

- Cursor
- VS Code MCP
- Claude Code
- Any MCP client supporting JSON configuration

The public docs position the server as a way for AI assistants to explore Retell endpoints, make test requests, and help integrate the SDK. Local search found no evidence that `retell-backend`, `retell-dashboard-v2`, or `retell-hermes` business code directly consumes this MCP server.

The package already supports:

- `stdio` transport for local MCP clients.
- `http` transport via MCP Streamable HTTP.
- `/health` route.
- Per-request auth parsing from `Authorization: Bearer ...` and `x-retell-api-key`.
- Local docs search through an embedded `MiniSearch` index.
- Local Deno-based code execution sandbox constrained to the Retell API host and SDK package paths.

Remaining Stainless-hosted/runtime coupling:

- Public VS Code install link uses `vscode.stainless.com`.
- Some headers/options/comments still use `x-stainless-*` naming.
- CI uploads package artifacts to `pkg.stainless.com`; this remains part of the artifact/staging pipeline and is not the remote runtime.

## Recommended Architecture

Create an independent ECS service for the MCP server.

AWS/service names:

- Domain: `mcp.retellai.com`
- ECR repository: `retell-mcp-server`
- ECS service: `retell-mcp-server-service`
- ECS task family: `retell-mcp-server`
- Container name: `retell-mcp-server`
- CloudWatch log group: `/ecs/retell-mcp-server`
- Container port: `3000`

The ECS task runs the existing MCP Docker image with command override:

```json
["--transport=http", "--port=3000"]
```

The ALB should route:

- `https://mcp.retellai.com/` to the MCP Streamable HTTP endpoint.
- `https://mcp.retellai.com/health` to the service health endpoint.

This should be separate from the main backend API service. The MCP runtime starts Deno worker processes for code execution; isolating it avoids coupling that runtime and resource profile to the main Retell API.

Use the existing public ALB pattern if AWS inspection confirms it can safely host another rule. The preferred edge path is:

```text
Internet -> existing public ALB -> mcp.retellai.com host rule -> MCP target group -> ECS Fargate tasks on port 3000
```

Create a dedicated ALB only if the infrastructure owner wants stronger isolation for the code-execution surface or the existing public ALB cannot safely route this service. A dedicated ALB is cleaner isolation, but it adds more AWS resources, cost, DNS/certificate work, and operational surface.

Run the service on Fargate in private subnets with no public task IP. The MCP task security group should allow inbound TCP `3000` only from the ALB security group. Do not copy cronjob subnet/security-group defaults unless AWS inspection confirms they are the correct public-service networking values.

Start with desired count `2`. This preserves availability during deploys and single-task failures. Start with `1 vCPU / 4 GB` per task; if Deno worker smoke/load testing shows memory pressure, move to `1 vCPU / 8 GB`, matching the existing `retell-backend` copilot Fargate task size.

## Deployment Contract

Add these files to `RetellAI/retell-typescript-sdk`:

- `.github/workflows/deploy-mcp-server.yml`
- `ecs/mcp/task-def-mcp-server.json`

The deployment workflow should follow the simpler single-service shape of `retell-backend/.github/workflows/copilot-deploy.yml`:

1. Checkout.
2. Configure AWS credentials, preferably with GitHub OIDC and `AWS_ROLE_ARN`.
3. Login to ECR.
4. Ensure ECR repository `retell-mcp-server` exists, or require it to be pre-provisioned.
5. Build Docker image:

```sh
docker build --platform linux/amd64 -f packages/mcp-server/Dockerfile -t "$IMAGE_URI" .
```

6. Push image tagged with the commit SHA.
7. Render `ecs/mcp/task-def-mcp-server.json` with the pushed image.
8. Deploy to ECS service `retell-mcp-server-service`.
9. Wait for service stability.
10. Smoke test `https://mcp.retellai.com/health`.

Suggested workflow triggers:

```yaml
on:
  push:
    branches: ["main"]
    paths:
      - "packages/mcp-server/**"
      - "src/**"
      - "package.json"
      - "yarn.lock"
      - "ecs/mcp/**"
      - ".github/workflows/deploy-mcp-server.yml"
  workflow_dispatch:
```

## ECS Task Definition Contract

`ecs/mcp/task-def-mcp-server.json` should use:

- `requiresCompatibilities`: `["FARGATE"]`
- `networkMode`: `awsvpc`
- `cpu`: start with `"1024"`
- `memory`: start with `"4096"`; increase to `"8192"` if Deno worker testing requires it
- `runtimePlatform.cpuArchitecture`: `X86_64`
- `runtimePlatform.operatingSystemFamily`: `LINUX`
- `executionRoleArn`: existing Retell ECS task execution role
- `taskRoleArn`: least-privilege role; no Retell API key secret required
- Container port `3000` with `appProtocol: "http"`
- Health check:

```json
["CMD-SHELL", "curl -f http://localhost:3000/health || exit 1"]
```

Do not copy backend API's `/` health check. `/` is the MCP endpoint for this service.

Do not set `RETELL_API_KEY` in task environment or secrets. Each MCP client must provide its own API key per request.

## Public Client Contract

Document remote usage as:

```json
{
  "mcpServers": {
    "retell": {
      "url": "https://mcp.retellai.com/",
      "headers": {
        "Authorization": "Bearer YOUR_RETELL_API_KEY"
      }
    }
  }
}
```

Keep `x-retell-api-key` supported for clients that require custom header style, but prefer `Authorization: Bearer ...` in docs.

The service should remain usable by public MCP clients. It is not internal-only.

## Security And Abuse Controls

Preserve the existing safety guarantees:

- The server must not hold a shared Retell API key.
- Caller API keys must be accepted only through request headers and redacted in logs.
- Code execution permissions remain best-effort and are not a security boundary.
- Strong enforcement of destructive API access should happen through caller-provided Retell API key scopes/permissions where available.

Add or verify:

- Header redaction for `Authorization`, `x-retell-api-key`, `x-stainless-mcp-client-envs`, cookies, keys, and tokens.
- ALB/WAF or application-level rate limiting for public access.
- CloudWatch alarms for 5xx rate, task restarts, CPU/memory saturation, and elevated code execution errors.
- Reasonable ECS CPU/memory sizing for Deno worker startup and concurrent tool calls.

Retell API keys already support scopes in `retell-backend`. Preserve the existing MCP behavior by passing the caller-provided API key through to the Retell API; do not add a separate MCP-specific authorization model in this migration. Documentation should recommend creating a dedicated, scoped API key for MCP usage:

- Use read scopes for exploration when possible.
- Add write scopes such as `Agent.Write`, `Call.Write`, or `Phone.Write` only when the assistant is expected to mutate resources.
- Treat legacy unscoped keys as broad-access keys.

Legacy Stainless headers such as `x-stainless-mcp-client-envs` and `x-stainless-mcp-client-permissions` can remain initially for compatibility. A follow-up cleanup can introduce Retell-prefixed aliases and deprecate Stainless names after the hosting migration is stable.

## Generation Preservation

The staging artifact upload itself is not the overwrite path. `ci.yml` builds the SDK and uploads npm tarballs to `pkg.stainless.com` when running in `RetellAI/retell-typescript-sdk-staging`; it does not unpack artifacts back into `RetellAI/retell-typescript-sdk`.

The active overwrite risk is the staging repo's promote workflow: `RetellAI/retell-typescript-sdk-staging` creates production `stainless-release` from staging `origin/main`, restores production-owned files from `production/main`, removes staging-only `stlc-promote.yml`, then force-pushes that branch to `RetellAI/retell-typescript-sdk`. Production `stlc-auto-merge.yml` only merges the release PR after checks pass; it does not create the branch.

That means files that exist only in production `main`, but not in staging `main`, can appear as deletions in the next generated release PR.

The source of the SDK generation pipeline is `RetellAI/docs`. Its `.github/workflows/stlc-generate.yml` runs `stlc build --push` from the `stainless` workspace when `openapi.yaml`, `config.yaml`, or `stainless/**` changes. `RetellAI/docs` `config.yaml` currently configures the TypeScript target as:

```yaml
targets:
  typescript:
    production_repo: RetellAI/retell-typescript-sdk#main
    keep_files:
      - .github/workflows/stlc-promote.yml
    staging_repo: RetellAI/retell-typescript-sdk-staging
```

Do not add the MCP deploy files to staging just to make generation preserve them. A manual staging commit has previously caused stls push failures because the staging base no longer matched the generated fast-forward target. If a staging re-alignment is required anyway, keep that change focused on the existing promote workflow rather than introducing production deploy files into the staging tree.

Current staging state: `RetellAI/retell-typescript-sdk-staging` commit `f934014c` preserves the entire production `.github/workflows` directory, then removes `.github/workflows/stlc-promote.yml` from the release branch:

```yaml
git rm -r -f --ignore-unmatch .github/workflows
git checkout production/main -- .github/workflows
git rm -f --ignore-unmatch .github/workflows/stlc-promote.yml
```

This protects `.github/workflows/deploy-mcp-server.yml` without requiring the generated staging tree to contain production deploy config. It does not protect `ecs/mcp/task-def-mcp-server.json`, because that file is outside `.github/workflows`. Preserve that task definition separately in the promote workflow, or move the task definition under a path that is already intentionally preserved. The preferred file layout remains `ecs/mcp/task-def-mcp-server.json`, so preserve that one path explicitly.

Since `stlc-promote.yml` itself is already protected by `RetellAI/docs` `keep_files`, the one-time staging workflow change should survive later stls generation once the staging base has been re-aligned.

Do not remove the existing artifact upload behavior to `pkg.stainless.com` unless the SDK artifact pipeline owners confirm it is no longer needed. That upload is separate from remote MCP hosting.

## Rollout Plan

1. Confirm `RetellAI/retell-typescript-sdk-staging` `.github/workflows/stlc-promote.yml` preserves production `.github/workflows`, and add explicit preservation for `ecs/mcp/task-def-mcp-server.json`.
2. Re-align the staging branch with the stls pipeline after the staging workflow commit, so future generated pushes can fast-forward cleanly.
3. Add ECS task definition and deploy workflow to this repo.
4. Provision AWS resources:
   - ECR repo
   - ECS cluster/service
   - Target group
   - Existing public ALB host rule for `mcp.retellai.com`
   - ACM coverage
   - Route53 record
   - GitHub `AWS_ROLE_ARN` secret or equivalent deploy credential
5. Deploy to a staging or temporary hostname if available.
6. Smoke test health, MCP initialize, docs search, and code execution.
7. Move public docs/install examples to `https://mcp.retellai.com/`.
8. Monitor first production deploy and first subsequent Stainless regeneration.
9. Clean up or alias Stainless-specific runtime names in a separate low-risk PR.

## Verification

Local:

```sh
docker build -f packages/mcp-server/Dockerfile -t retell-mcp-server:local .
docker run -p 3000:3000 retell-mcp-server:local --transport=http --port=3000
curl http://localhost:3000/health
```

Remote:

```sh
curl https://mcp.retellai.com/health
```

MCP client verification:

- Initialize succeeds over Streamable HTTP.
- `search_docs` returns Retell SDK docs for a known query.
- `execute` can run a simple Retell SDK read call using the caller's API key.
- Missing or invalid API key fails cleanly.
- Auth and key headers are redacted in CloudWatch logs.
- ECS service remains stable under a small burst of concurrent tool calls.

Regeneration verification:

- After the next generated SDK release PR, `.github/workflows/deploy-mcp-server.yml` still exists in the PR result.
- After the next generated SDK release PR, `ecs/mcp/task-def-mcp-server.json` still exists in the PR result.
- The deploy workflow still points to the expected ECR repository and ECS service.

## Risks

- Public MCP endpoint can be abused for code execution attempts. Mitigate with per-request auth, rate limiting, log redaction, ECS isolation, and Retell API permission boundaries.
- Deno worker startup may increase latency and CPU/memory usage. Size ECS tasks based on smoke/load testing rather than backend API defaults.
- Production-only deploy files can be deleted by `stlc-promote.yml` because `stainless-release` starts from staging `origin/main`. The production workflow directory is now preserved by staging commit `f934014c`; still preserve the non-workflow ECS task definition path, then re-align staging with the stls pipeline so future generated pushes can fast-forward cleanly.
- Some MCP clients may not support custom headers uniformly. Keep both `Authorization` and `x-retell-api-key` support.
- Changing Stainless-prefixed headers too early may break clients that already send them. Treat naming cleanup as a follow-up compatibility project.

## Decisions

- Public domain: use `mcp.retellai.com`.
- Service shape: independent ECS Fargate service, not embedded in the main backend API service.
- Edge routing: prefer the existing public ALB with a new `mcp.retellai.com` host rule and a dedicated MCP target group.
- Task networking: private subnets, no public task IP, inbound port `3000` allowed only from the ALB security group.
- Initial capacity: desired count `2`, `1 vCPU / 4 GB` per task, with a planned increase to `1 vCPU / 8 GB` if Deno worker testing shows memory pressure.
- Auth model: preserve per-request caller API key behavior. Recommend dedicated scoped API keys for MCP usage; do not add a shared server-side Retell API key.

## Implementation Checks

Before coding or provisioning, inspect AWS and confirm:

- Which existing public ALB should receive the `mcp.retellai.com` host rule.
- Which ALB security group should be allowed to reach MCP task port `3000`.
- Which private subnet IDs should be used for the Fargate service.
- Which ECS cluster should host this service. Reuse an existing public stateless service cluster if that is the Retell convention; otherwise create a dedicated `retell-mcp-server` cluster.
- Whether existing ACM certificate coverage includes `mcp.retellai.com`, or whether a new certificate/SAN is needed.
- Whether the target group, ECS service, and ALB listener should be managed manually, by existing infra tooling, or by a one-off AWS setup runbook.
- Whether autoscaling should start with CPU/memory policies only, or also use ALB request count per target once baseline traffic is known.
