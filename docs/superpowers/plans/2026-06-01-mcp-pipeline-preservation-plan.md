# MCP Pipeline Preservation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prevent future stls-generated release PRs from deleting production-only MCP deploy files.

**Architecture:** Keep MCP deploy files production-only in `RetellAI/retell-typescript-sdk`. The staging repo already preserves the production `.github/workflows` directory as of `f934014c`, which protects the deploy workflow. Add one remaining preservation hook for the non-workflow ECS task definition, then re-align stls tracking to the final staging head.

**Tech Stack:** GitHub Actions, git, RetellAI/retell-typescript-sdk-staging, stls promotion workflow.

---

## File Structure

- Modify in `RetellAI/retell-typescript-sdk-staging`: `.github/workflows/stlc-promote.yml`
  - Responsibility: creates and force-pushes the production `stainless-release` branch from staging `origin/main`.
  - Existing state: preserves production `.github/workflows`, then removes staging-only `.github/workflows/stlc-promote.yml`.
  - Change: preserve `ecs/mcp/task-def-mcp-server.json` from production and include it in the promote commit's diff/add paths.

No files in `RetellAI/retell-typescript-sdk` are changed by this plan.

### Task 1: Preserve the Non-Workflow MCP Task Definition

**Files:**
- Modify: `.github/workflows/stlc-promote.yml`

- [ ] **Step 1: Clone the staging repo into a temporary worktree**

Run:

```bash
cd /private/tmp
rm -rf retell-typescript-sdk-staging-mcp-preserve
git clone https://github.com/RetellAI/retell-typescript-sdk-staging.git retell-typescript-sdk-staging-mcp-preserve
cd retell-typescript-sdk-staging-mcp-preserve
git switch -c mcp-preserve-task-definition
```

Expected: branch `mcp-preserve-task-definition` exists locally.

- [ ] **Step 2: Verify current workflow-directory preservation**

Run:

```bash
sed -n '/git switch --force-create stainless-release origin\\/main/,/for release_path in \\/p' .github/workflows/stlc-promote.yml
```

Expected output includes:

```txt
git rm -r -f --ignore-unmatch .github/workflows
git checkout production/main -- .github/workflows
git rm -f --ignore-unmatch .github/workflows/stlc-promote.yml
```

- [ ] **Step 3: Add explicit preservation for the ECS task definition**

Edit `.github/workflows/stlc-promote.yml` so the block immediately after `git rm -f --ignore-unmatch .github/workflows/stlc-promote.yml` is:

```yaml
          if git cat-file -e "production/main:ecs/mcp/task-def-mcp-server.json" 2>/dev/null; then
            git checkout production/main -- ecs/mcp/task-def-mcp-server.json
          else
            git rm -f --ignore-unmatch ecs/mcp/task-def-mcp-server.json
          fi
```

- [ ] **Step 4: Include the task definition in the preserve commit detection**

Edit the `git diff --quiet HEAD -- \` block so it includes `ecs/mcp/task-def-mcp-server.json`:

```yaml
          if ! git diff --quiet HEAD -- \
            .github/workflows \
            .release-please-manifest.json \
            CHANGELOG.md \
            package.json \
            packages/mcp-server/package.json \
            src/version.ts \
            ecs/mcp/task-def-mcp-server.json
          then
```

- [ ] **Step 5: Include the task definition in the preserve commit add list**

Edit the `git add \` block so it includes `ecs/mcp/task-def-mcp-server.json`:

```yaml
            git add \
              .github/workflows \
              .release-please-manifest.json \
              CHANGELOG.md \
              package.json \
              packages/mcp-server/package.json \
              src/version.ts \
              ecs/mcp/task-def-mcp-server.json
```

- [ ] **Step 6: Verify YAML parses**

Run:

```bash
ruby -e 'require "yaml"; YAML.load_file(".github/workflows/stlc-promote.yml"); puts "yaml ok"'
```

Expected:

```txt
yaml ok
```

- [ ] **Step 7: Verify only task-definition preservation changed**

Run:

```bash
git diff -- .github/workflows/stlc-promote.yml
```

Expected diff includes the new `ecs/mcp/task-def-mcp-server.json` preservation block and adds that same path to both the `git diff --quiet` and `git add` path lists. It must not remove the existing `.github/workflows` directory preservation.

- [ ] **Step 8: Commit the staging workflow change**

Run:

```bash
git add .github/workflows/stlc-promote.yml
git commit -m "chore: preserve MCP task definition"
```

Expected: one commit with only `.github/workflows/stlc-promote.yml` changed.

- [ ] **Step 9: Push a staging PR branch**

Run only after explicit approval for the external push:

```bash
git push origin mcp-preserve-task-definition
```

Expected: branch exists on `RetellAI/retell-typescript-sdk-staging`.

- [ ] **Step 10: Open PR**

Create a PR in `RetellAI/retell-typescript-sdk-staging`:

```txt
Title: chore: preserve MCP task definition

Body:
The staging promote workflow already preserves production .github/workflows and removes the staging-only stlc-promote workflow from the release branch.

This PR adds the remaining non-workflow MCP deploy file, ecs/mcp/task-def-mcp-server.json, to the production-owned files restored from production main. Without this, the staging-generated stainless-release branch can still delete the ECS task definition from production during the next SDK release PR.
```

Expected: PR contains one workflow-only commit.

### Task 2: Re-Align TypeScript Staging With stls

**Files:**
- Modify in `RetellAI/docs`: `stainless/custom-code/typescript/2026-05-29T18-39-50-117Z-custom-code.json`
- Update remote ref in `RetellAI/retell-typescript-sdk-staging`: `refs/stainless/integrated-for/main/44a070a3b5635060bf26f55e25d103de586f835b`

- [ ] **Step 1: Merge the staging PR**

Use normal repo review and merge process for `RetellAI/retell-typescript-sdk-staging`.

Expected: `main` includes the workflow-directory preservation commit and the task-definition preservation commit. Capture the final staging head after all manual staging commits have merged.

- [ ] **Step 2: Capture the new TypeScript staging head**

Run:

```bash
NEW_TS_STAGING_HEAD="$(git ls-remote https://github.com/RetellAI/retell-typescript-sdk-staging.git refs/heads/main | awk '{print $1}')"
echo "$NEW_TS_STAGING_HEAD"
printf '%s\n' "$NEW_TS_STAGING_HEAD" > /tmp/new-ts-staging-head.txt
```

Expected: output is the final manually advanced staging `main` SHA.

- [ ] **Step 3: Confirm the current docs tracking base**

Run:

```bash
cd /private/tmp
rm -rf retell-docs-mcp-stls-realign
git clone https://github.com/RetellAI/docs.git retell-docs-mcp-stls-realign
cd retell-docs-mcp-stls-realign
git switch -c mcp-typescript-staging-realign
cat stainless/custom-code/typescript/2026-05-29T18-39-50-117Z-custom-code.json
```

Expected:

```json
{
  "base": "44a070a3b5635060bf26f55e25d103de586f835b",
  "integrated": "d9fe7ab1325c785261c6e570498edc54a769c222",
  "filename": "2026-05-29T18-39-50-117Z-custom-code.json",
  "branch": "main"
}
```

- [ ] **Step 4: Update TypeScript docs tracking to the new staging head**

Run:

```bash
node -e '
const fs = require("fs");
const path = "stainless/custom-code/typescript/2026-05-29T18-39-50-117Z-custom-code.json";
const next = fs.readFileSync("/tmp/new-ts-staging-head.txt", "utf8").trim();
if (!/^[0-9a-f]{40}$/.test(next || "")) throw new Error("NEW_TS_STAGING_HEAD must be a git SHA");
const json = JSON.parse(fs.readFileSync(path, "utf8"));
json.integrated = next;
fs.writeFileSync(path, `${JSON.stringify(json, null, 2)}\n`);
'
```

Expected: only `integrated` changes in the TypeScript custom-code JSON.

- [ ] **Step 5: Do not change Python tracking for this TypeScript-only migration**

Run:

```bash
git diff -- stainless/custom-code/python stainless/custom-code/typescript
```

Expected diff only modifies:

```txt
stainless/custom-code/typescript/2026-05-29T18-39-50-117Z-custom-code.json
```

Do not update `stainless/custom-code/python/*.json` unless the Python staging repo was also manually advanced. Python tracking points at a different staging repo and must not be set to the TypeScript staging commit.

- [ ] **Step 6: Commit docs tracking change**

Run:

```bash
git add stainless/custom-code/typescript/2026-05-29T18-39-50-117Z-custom-code.json
git commit -m "chore: realign TypeScript SDK staging tracking"
```

Expected: one docs repo commit with only the TypeScript custom-code JSON changed.

- [ ] **Step 7: Push docs tracking PR branch**

Run only after explicit approval for the external push:

```bash
git push origin mcp-typescript-staging-realign
```

Expected: branch exists on `RetellAI/docs`.

- [ ] **Step 8: Open docs PR**

Create a PR in `RetellAI/docs`:

```txt
Title: chore: realign TypeScript SDK staging tracking

Body:
This updates the TypeScript stlc custom-code tracking metadata after a one-time manual staging commit to preserve production-owned MCP deploy files.

The staging repo main branch was advanced intentionally to preserve production-owned MCP deploy files. Updating integrated tells stlc that the new staging head is the valid baseline for future build --push runs.
```

Expected: PR contains one JSON-only commit.

- [ ] **Step 9: Merge docs tracking PR**

Use normal review and merge process for `RetellAI/docs`.

Expected: `RetellAI/docs` `main` contains the updated TypeScript `integrated` SHA.

- [ ] **Step 10: Update the staging Stainless integrated ref**

Run from any clone of `RetellAI/retell-typescript-sdk-staging` after explicit approval for the external ref update:

```bash
cd /private/tmp/retell-typescript-sdk-staging-mcp-preserve
git fetch origin main
NEW_TS_STAGING_HEAD="$(cat /tmp/new-ts-staging-head.txt)"
git update-ref refs/stainless/integrated-for/main/44a070a3b5635060bf26f55e25d103de586f835b "$NEW_TS_STAGING_HEAD"
git push origin refs/stainless/integrated-for/main/44a070a3b5635060bf26f55e25d103de586f835b
```

Expected: remote ref `refs/stainless/integrated-for/main/44a070a3b5635060bf26f55e25d103de586f835b` points to the same SHA as staging `main`.

- [ ] **Step 11: Verify docs tracking and staging metadata ref match**

Run:

```bash
git ls-remote https://github.com/RetellAI/retell-typescript-sdk-staging.git \
  refs/heads/main \
  refs/stainless/integrated-for/main/44a070a3b5635060bf26f55e25d103de586f835b
```

Expected: both refs point to the same new TypeScript staging SHA.

- [ ] **Step 12: Trigger the docs stls generation workflow**

Run after explicit approval for the remote workflow dispatch:

```bash
gh workflow run stlc-generate.yml --repo RetellAI/docs --ref main
```

Expected: a new `Generate SDKs with stlc` workflow run starts in `RetellAI/docs`.

- [ ] **Step 13: Watch the generation run**

Run:

```bash
gh run list --repo RetellAI/docs --workflow stlc-generate.yml --limit 1
```

Expected: latest run eventually reaches `completed` with conclusion `success`.

- [ ] **Step 14: Confirm staging still preserves workflow directory and task definition after generation**

Run from the SDK repo:

```bash
cd /Users/rogersxie/retell-typescript-sdk
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

- [ ] **Step 15: Commit no SDK repo changes**

Run:

```bash
cd /Users/rogersxie/retell-typescript-sdk
git status --short
```

Expected: no output.
