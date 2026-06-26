# GitHub Actions Secrets Setup Guide

## Overview

This guide explains how to configure secrets for the GitHub Actions CI/CD pipeline.

## Required Secrets

### 1. Docker Registry Credentials

**For Docker Hub:**
```
DOCKER_USERNAME     # Your Docker Hub username
DOCKER_PASSWORD     # Your Docker Hub access token
```

**For GitHub Container Registry (GHCR):**
- Uses `GITHUB_TOKEN` automatically (no setup needed)

### 2. Staging Server Credentials

```
STAGING_HOST        # Staging server hostname/IP
STAGING_USER        # SSH username for staging server
STAGING_SSH_KEY     # SSH private key (base64 encoded)
```

### 3. Production Server Credentials

```
PROD_HOST           # Production server hostname/IP
PROD_USER           # SSH username for production server
PROD_SSH_KEY        # SSH private key (base64 encoded)
```

### 4. Notifications

```
SLACK_WEBHOOK       # Slack webhook URL for notifications
```

## Step-by-Step Setup

### Step 1: Generate SSH Keys

If you don't have SSH keys, generate them:

```bash
# Generate new SSH key pair
ssh-keygen -t rsa -b 4096 -f ~/.ssh/anchor-deploy -N ""

# This creates:
# ~/.ssh/anchor-deploy (private key)
# ~/.ssh/anchor-deploy.pub (public key)
```

### Step 2: Add Public Key to Servers

**For Staging:**
```bash
# Copy public key to staging server
ssh-copy-id -i ~/.ssh/anchor-deploy.pub user@staging.example.com

# Or manually:
cat ~/.ssh/anchor-deploy.pub | ssh user@staging.example.com "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

**For Production:**
```bash
# Copy public key to production server
ssh-copy-id -i ~/.ssh/anchor-deploy.pub user@prod.example.com
```

### Step 3: Encode SSH Private Key

```bash
# Linux/Mac
cat ~/.ssh/anchor-deploy | base64 -w 0 > ssh_key_base64.txt

# Windows (PowerShell)
$key = [System.IO.File]::ReadAllBytes("C:\Users\username\.ssh\anchor-deploy")
$encoded = [Convert]::ToBase64String($key)
$encoded | Out-File ssh_key_base64.txt

# Copy the content from the file
cat ssh_key_base64.txt
```

### Step 4: Add Secrets to GitHub

1. Go to your GitHub repository
2. Click **Settings** (top right)
3. Click **Secrets and variables** → **Actions** (left sidebar)
4. Click **New repository secret**

Add each secret:

| Secret Name | Value |
|---|---|
| `STAGING_HOST` | `staging.example.com` |
| `STAGING_USER` | `deploy` |
| `STAGING_SSH_KEY` | (base64 encoded private key) |
| `PROD_HOST` | `prod.example.com` |
| `PROD_USER` | `deploy` |
| `PROD_SSH_KEY` | (base64 encoded private key) |
| `SLACK_WEBHOOK` | `https://hooks.slack.com/services/...` |

### Step 5: Create Slack Webhook (Optional)

1. Go to [Slack API](https://api.slack.com/apps)
2. Click **Create New App**
3. Choose **From scratch**
4. Enter app name and workspace
5. Go to **Incoming Webhooks**
6. Click **Add New Webhook to Workspace**
7. Select channel
8. Copy webhook URL
9. Add as `SLACK_WEBHOOK` secret

### Step 6: Test Secrets

Create a test workflow to verify secrets are working:

```yaml
name: Test Secrets

on: workflow_dispatch

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Test SSH Key
        run: |
          echo "SSH Key length: ${#STAGING_SSH_KEY}"
          if [ -z "$STAGING_SSH_KEY" ]; then
            echo "ERROR: SSH key is empty!"
            exit 1
          fi
          echo "✓ SSH key is set"
        env:
          STAGING_SSH_KEY: ${{ secrets.STAGING_SSH_KEY }}

      - name: Test Slack Webhook
        run: |
          if [ -z "$SLACK_WEBHOOK" ]; then
            echo "ERROR: Slack webhook is empty!"
            exit 1
          fi
          echo "✓ Slack webhook is set"
        env:
          SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
```

## Secret Management Best Practices

### 1. Secret Naming

- Use UPPERCASE with underscores
- Use descriptive names
- Prefix with environment (STAGING_, PROD_)

```
✓ STAGING_SSH_KEY
✓ PROD_DATABASE_URL
✗ key
✗ password123
```

### 2. Secret Rotation

Rotate secrets regularly:

```bash
# Generate new SSH key
ssh-keygen -t rsa -b 4096 -f ~/.ssh/anchor-deploy-new

# Update authorized_keys on servers
ssh-copy-id -i ~/.ssh/anchor-deploy-new.pub user@host

# Update GitHub secret
# (Encode new key and update STAGING_SSH_KEY)

# Remove old key from servers
ssh user@host "sed -i '/old_key_content/d' ~/.ssh/authorized_keys"

# Delete old key locally
rm ~/.ssh/anchor-deploy ~/.ssh/anchor-deploy.pub
```

### 3. Secret Audit

GitHub automatically logs secret access. Check logs:

1. Go to **Settings** → **Audit log**
2. Filter by action: `secret`
3. Review access history

### 4. Secret Security

- ✅ Never log secrets
- ✅ Use `secrets.` context
- ✅ Mask secrets in logs
- ✅ Rotate regularly
- ✅ Use short-lived credentials
- ✅ Limit scope
- ✅ Audit access

## Troubleshooting

### Secret Not Available in Workflow

**Problem:** `${{ secrets.SECRET_NAME }}` returns empty

**Solution:**
1. Verify secret name is exactly correct (case-sensitive)
2. Check secret is in correct repository
3. Verify user has permission to view secrets
4. Re-create secret if needed

### SSH Connection Fails

**Problem:** `Permission denied (publickey)`

**Solution:**
1. Verify public key is on server: `cat ~/.ssh/authorized_keys`
2. Check SSH key permissions: `chmod 600 ~/.ssh/authorized_keys`
3. Verify SSH key is correctly encoded
4. Test SSH locally: `ssh -i key.pem user@host`

### Slack Notification Not Received

**Problem:** Workflow succeeds but no Slack message

**Solution:**
1. Verify webhook URL is correct
2. Check webhook is for correct channel
3. Test webhook with curl:
   ```bash
   curl -X POST $SLACK_WEBHOOK \
     -H 'Content-Type: application/json' \
     -d '{"text":"Test message"}'
   ```
4. Check Slack app permissions

### Base64 Encoding Issues

**Problem:** SSH key doesn't work after encoding

**Solution:**
1. Verify encoding is correct:
   ```bash
   # Encode
   cat key | base64 -w 0
   
   # Decode (to verify)
   echo "encoded_string" | base64 -d > key_decoded
   ```
2. Use `-w 0` flag to avoid line breaks
3. Don't add extra newlines
4. Test locally before adding to GitHub

## Advanced Configuration

### Environment-Specific Secrets

Create separate environments with different secrets:

```yaml
# Settings → Environments → Create environment

# Staging environment
STAGING_HOST: staging.example.com
STAGING_USER: deploy

# Production environment
PROD_HOST: prod.example.com
PROD_USER: deploy
```

Use in workflow:

```yaml
deploy-staging:
  environment: staging
  steps:
    - uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.STAGING_HOST }}
        username: ${{ secrets.STAGING_USER }}
        key: ${{ secrets.STAGING_SSH_KEY }}
```

### Organization Secrets

For organization-level secrets:

1. Go to **Organization settings**
2. Click **Secrets** (left sidebar)
3. Add organization secrets
4. Select which repositories can access

Use in workflow:

```yaml
steps:
  - run: echo ${{ secrets.ORG_SECRET }}
```

### Encrypted Secrets

GitHub automatically encrypts secrets:

- Encrypted at rest
- Encrypted in transit
- Only decrypted when used
- Never logged or displayed

## Verification Checklist

- [ ] All required secrets are added
- [ ] Secret names are correct
- [ ] SSH keys are properly encoded
- [ ] Public keys are on servers
- [ ] Slack webhook is valid
- [ ] Test workflow passes
- [ ] Secrets are not logged
- [ ] Secrets are rotated regularly

## Support

For issues:
1. Check [GitHub Actions Documentation](https://docs.github.com/en/actions)
2. Review workflow logs
3. Test SSH locally
4. Verify secret encoding
5. Check server connectivity

## Related Files

- `.github/workflows/docker-build-deploy.yml` - Main workflow
- `.github/workflows/tests.yml` - Testing workflow
- `CI_CD_INTEGRATION_GUIDE.md` - Full integration guide
