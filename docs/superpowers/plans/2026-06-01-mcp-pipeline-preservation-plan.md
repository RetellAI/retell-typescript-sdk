# MCP Pipeline Preservation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prevent future stls-generated release PRs from deleting production-only MCP deploy files.

**Architecture:** Keep MCP deploy files production-only in `RetellAI/retell-typescript-sdk`. Update the staging repo's promotion workflow so `stainless-release` checks those files out from production `main`, the same way it already preserves production-owned workflow files.

**Tech Stack:** GitHub Actions, git, RetellAI/retell-typescript-sdk-staging, stls promotion workflow.

---

## File Structure

- Modify in `RetellAI/retell-typescript-sdk-staging`: `.github/workflows/stlc-promote.yml`
  - Responsibility: creates and force-pushes the production `stainless-release` branch from staging `origin/main`.
  - Change: add MCP deploy paths to the existing `Preserve production-owned files` allowlist.

No files in `RetellAI/retell-typescript-sdk` are changed by this plan.

### Task 1: Patch Staging Promotion Allowlist

**Files:**
- Modify: `.github/workflows/stlc-promote.yml`

- [ ] **Step 1: Clone the staging repo into a temporary worktree**

Run:

```bash
cd /private/tmp
rm -rf retell-typescript-sdk-staging-mcp-preserve
git clone https://github.com/RetellAI/retell-typescript-sdk-staging.git retell-typescript-sdk-staging-mcp-preserve
cd retell-typescript-sdk-staging-mcp-preserve
git switch -c mcp-preserve-prod-deploy-files
```

Expected: branch `mcp-preserve-prod-deploy-files` exists locally.

- [ ] **Step 2: Inspect the current preserve list**

Run:

```bash
sed -n '/for path in \\/,/^          do$/p' .github/workflows/stlc-promote.yml
```

Expected output includes exactly these existing production-owned workflow files:

```txt
.github/workflows/ci.yml
.github/workflows/publish-npm.yml
.github/workflows/release-doctor.yml
.github/workflows/release-please.yml
.github/workflows/stlc-auto-merge.yml
```

- [ ] **Step 3: Add MCP deploy files to the preserve list**

Edit `.github/workflows/stlc-promote.yml` so the first `for path in \` block is:

```yaml
          for path in \
            .github/workflows/ci.yml \
            .github/workflows/publish-npm.yml \
            .github/workflows/release-doctor.yml \
            .github/workflows/release-please.yml \
            .github/workflows/stlc-auto-merge.yml \
            .github/workflows/deploy-mcp-server.yml \
            ecs/mcp/task-def-mcp-server.json
          do
            if git cat-file -e "production/main:${path}" 2>/dev/null; then
              git checkout production/main -- "${path}"
            else
              git rm -f --ignore-unmatch "${path}"
            fi
          done
```

- [ ] **Step 4: Verify YAML parses**

Run:

```bash
ruby -e 'require "yaml"; YAML.load_file(".github/workflows/stlc-promote.yml"); puts "yaml ok"'
```

Expected:

```txt
yaml ok
```

- [ ] **Step 5: Verify only the allowlist changed**

Run:

```bash
git diff -- .github/workflows/stlc-promote.yml
```

Expected diff only adds:

```diff
+            .github/workflows/deploy-mcp-server.yml \
+            ecs/mcp/task-def-mcp-server.json
```

- [ ] **Step 6: Commit the staging workflow change**

Run:

```bash
git add .github/workflows/stlc-promote.yml
git commit -m "chore: preserve MCP deploy files"
```

Expected: one commit with only `.github/workflows/stlc-promote.yml` changed.

- [ ] **Step 7: Push a staging PR branch**

Run only after explicit approval for the external push:

```bash
git push origin mcp-preserve-prod-deploy-files
```

Expected: branch exists on `RetellAI/retell-typescript-sdk-staging`.

- [ ] **Step 8: Open PR**

Create a PR in `RetellAI/retell-typescript-sdk-staging`:

```txt
Title: chore: preserve MCP deploy files

Body:
This adds the Retell-owned MCP deploy workflow and ECS task definition to the stlc promotion preserve list.

These files live only in the production SDK repo. Without this allowlist, the staging-generated stainless-release branch can delete them from production during the next SDK release PR.
```

Expected: PR contains one workflow-only commit.

### Task 2: Re-Align TypeScript Staging With stls

**Files:**
- Modify in `RetellAI/docs`: `stainless/custom-code/typescript/2026-05-29T18-39-50-117Z-custom-code.json`
- Update remote ref in `RetellAI/retell-typescript-sdk-staging`: `refs/stainless/integrated-for/main/44a070a3b5635060bf26f55e25d103de586f835b`

- [ ] **Step 1: Merge the staging PR**

Use normal repo review and merge process for `RetellAI/retell-typescript-sdk-staging`.

Expected: `main` includes commit `chore: preserve MCP deploy files`.

- [ ] **Step 2: Capture the new TypeScript staging head**

Run:

```bash
NEW_TS_STAGING_HEAD="$(git ls-remote https://github.com/RetellAI/retell-typescript-sdk-staging.git refs/heads/main | awk '{print $1}')"
echo "$NEW_TS_STAGING_HEAD"
printf '%s\n' "$NEW_TS_STAGING_HEAD" > /tmp/new-ts-staging-head.txt
```

Expected: output is the new merge commit SHA from staging `main`.

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

The staging repo main branch was advanced intentionally. Updating integrated tells stlc that the new staging head is the valid baseline for future build --push runs.
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

- [ ] **Step 14: Confirm staging still has the allowlist after generation**

Run from the SDK repo:

```bash
cd /Users/rogersxie/retell-typescript-sdk
git fetch https://github.com/RetellAI/retell-typescript-sdk-staging.git main:refs/remotes/staging/main
git show staging/main:.github/workflows/stlc-promote.yml | rg "deploy-mcp-server|task-def-mcp-server"
```

Expected:

```txt
            .github/workflows/deploy-mcp-server.yml \
            ecs/mcp/task-def-mcp-server.json
```

- [ ] **Step 15: Commit no SDK repo changes**

Run:

```bash
cd /Users/rogersxie/retell-typescript-sdk
git status --short
```

Expected: no output.
