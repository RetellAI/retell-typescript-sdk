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

### Task 2: Re-Align Staging With stls

**Files:**
- Verify remote state only.

- [ ] **Step 1: Merge the staging PR**

Use normal repo review and merge process for `RetellAI/retell-typescript-sdk-staging`.

Expected: `main` includes commit `chore: preserve MCP deploy files`.

- [ ] **Step 2: Trigger the docs stls generation workflow**

Run after explicit approval for the remote workflow dispatch:

```bash
gh workflow run stlc-generate.yml --repo RetellAI/docs --ref main
```

Expected: a new `Generate SDKs with stlc` workflow run starts in `RetellAI/docs`.

- [ ] **Step 3: Watch the generation run**

Run:

```bash
gh run list --repo RetellAI/docs --workflow stlc-generate.yml --limit 1
```

Expected: latest run eventually reaches `completed` with conclusion `success`.

- [ ] **Step 4: Confirm staging still has the allowlist**

Run:

```bash
git ls-remote https://github.com/RetellAI/retell-typescript-sdk-staging.git refs/heads/main
```

Then refresh the local remote ref from this SDK repo:

```bash
cd /Users/rogersxie/retell-typescript-sdk
git fetch https://github.com/RetellAI/retell-typescript-sdk-staging.git main:refs/remotes/staging/main
git show staging/main:.github/workflows/stlc-promote.yml | sed -n '/for path in \\/,/^          do$/p'
```

Expected output includes:

```txt
.github/workflows/deploy-mcp-server.yml
ecs/mcp/task-def-mcp-server.json
```

- [ ] **Step 5: Commit no SDK repo changes**

Run:

```bash
cd /Users/rogersxie/retell-typescript-sdk
git status --short
```

Expected: no output.

