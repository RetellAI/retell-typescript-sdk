# Retell MCP Server Self-Hosting Migration Spec

## Summary

Retell currently exposes an MCP server package generated with the TypeScript SDK. The package supports local `npx` usage and HTTP transport, but the public remote MCP runtime has depended on Stainless-hosted domain/server infrastructure. Stainless is deprecating that hosted runtime. Retell should migrate the remote MCP endpoint to Retell-owned infrastructure while preserving the existing Stainless/stls OpenAPI-to-artifact generation pipeline.

The target state is a public, developer-facing MCP endpoint hosted by Retell, backed by the existing `packages/mcp-server` runtime in this repository and deployed as an independent ECS service.

## Goals

- Host the remote MCP runtime at a Retell-owned domain, recommended as `https://mcp.retellai.com/`.
- Preserve existing MCP clients' core behavior:
  - MCP Streamable HTTP endpoint at `/`.
  - Health endpoint at `/health`.
  - Tools: `search_docs` and `execute`.
  - Per-request Retell API key authentication through `Authorization: Bearer ...` or `x-retell-api-key`.
- Reuse Retell's existing backend deployment pattern: GitHub Actions builds Docker image, pushes to ECR, renders an ECS task definition, and deploys an ECS service.
- Keep the Stainless/stls SDK artifact pipeline intact. OpenAPI-to-SDK artifact generation is not part of this migration.
- Ensure deploy files survive future Stainless regeneration through `keep_files`.

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

Recommended AWS/service names:

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

Legacy Stainless headers such as `x-stainless-mcp-client-envs` and `x-stainless-mcp-client-permissions` can remain initially for compatibility. A follow-up cleanup can introduce Retell-prefixed aliases and deprecate Stainless names after the hosting migration is stable.

## Generation Preservation

Because `retell-typescript-sdk` is still regenerated by Stainless/stls, deploy files must be preserved from `RetellAI/docs` config.

Add or verify `keep_files` for:

```yaml
targets:
  typescript:
    keep_files:
      - .github/workflows/deploy-mcp-server.yml
      - ecs/mcp/task-def-mcp-server.json
```

If there are existing promotion workflows that must survive regeneration, include them in the same `keep_files` list.

Do not remove the existing artifact upload behavior to `pkg.stainless.com` unless the SDK artifact pipeline owners confirm it is no longer needed. That upload is separate from remote MCP hosting.

## Rollout Plan

1. Add deploy file preservation to the Stainless/docs config.
2. Add ECS task definition and deploy workflow to this repo.
3. Provision AWS resources:
   - ECR repo
   - ECS cluster/service
   - Target group
   - ALB host rule
   - ACM coverage
   - Route53 record
   - GitHub `AWS_ROLE_ARN` secret or equivalent deploy credential
4. Deploy to a staging or temporary hostname if available.
5. Smoke test health, MCP initialize, docs search, and code execution.
6. Move public docs/install examples to `https://mcp.retellai.com/`.
7. Monitor first production deploy and first subsequent Stainless regeneration.
8. Clean up or alias Stainless-specific runtime names in a separate low-risk PR.

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

- After the next Stainless/stls regeneration, `.github/workflows/deploy-mcp-server.yml` still exists.
- After the next Stainless/stls regeneration, `ecs/mcp/task-def-mcp-server.json` still exists.
- The deploy workflow still points to the expected ECR repository and ECS service.

## Risks

- Public MCP endpoint can be abused for code execution attempts. Mitigate with per-request auth, rate limiting, log redaction, ECS isolation, and Retell API permission boundaries.
- Deno worker startup may increase latency and CPU/memory usage. Size ECS tasks based on smoke/load testing rather than backend API defaults.
- Generated SDK repo files can disappear if `keep_files` is incomplete. Verify preservation before relying on automatic deploys.
- Some MCP clients may not support custom headers uniformly. Keep both `Authorization` and `x-retell-api-key` support.
- Changing Stainless-prefixed headers too early may break clients that already send them. Treat naming cleanup as a follow-up compatibility project.

## Open Questions

- Confirm the final public domain: `mcp.retellai.com` or another Retell-owned hostname.
- Confirm whether the service should use an existing public ALB or a dedicated ALB.
- Confirm ECS cluster choice and Fargate networking values from AWS rather than copying cronjob defaults blindly.
- Confirm expected public traffic and concurrency so CPU/memory/autoscaling can be sized.
- Confirm whether Retell API keys already support scopes/limited permissions suitable for MCP usage.
