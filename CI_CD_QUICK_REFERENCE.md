# CI/CD Quick Reference Guide

## Platform Comparison

| Feature | GitHub Actions | GitLab CI/CD | Bitbucket | Jenkins |
|---------|---|---|---|---|
| **Setup** | Easy | Easy | Easy | Complex |
| **Cost** | Free (public) | Free | Free | Self-hosted |
| **Docker Support** | ✅ | ✅ | ✅ | ✅ |
| **Parallel Jobs** | ✅ | ✅ | ✅ | ✅ |
| **Caching** | ✅ | ✅ | ✅ | ✅ |
| **Secrets** | ✅ | ✅ | ✅ | ✅ |
| **Notifications** | ✅ | ✅ | ✅ | ✅ |
| **Approval Gates** | ✅ | ✅ | ✅ | ✅ |
| **Scalability** | Cloud | Cloud | Cloud | Self-hosted |

## Quick Setup Checklist

### GitHub Actions

- [ ] Create `.github/workflows/` directory
- [ ] Add workflow YAML files
- [ ] Go to Settings → Secrets and add:
  - `STAGING_HOST`
  - `STAGING_USER`
  - `STAGING_SSH_KEY`
  - `PROD_HOST`
  - `PROD_USER`
  - `PROD_SSH_KEY`
  - `SLACK_WEBHOOK`
- [ ] Push to repository
- [ ] View workflow in Actions tab

### GitLab CI/CD

- [ ] Add `.gitlab-ci.yml` to root
- [ ] Go to Settings → CI/CD → Variables
- [ ] Add all required variables
- [ ] Enable Container Registry
- [ ] Push to repository
- [ ] View pipeline in CI/CD → Pipelines

### Bitbucket Pipelines

- [ ] Add `bitbucket-pipelines.yml` to root
- [ ] Go to Repository settings → Pipelines
- [ ] Enable Pipelines
- [ ] Add Repository variables
- [ ] Push to repository
- [ ] View pipeline in Pipelines tab

### Jenkins

- [ ] Install Jenkins
- [ ] Install required plugins:
  - Pipeline
  - Docker
  - Git
  - Slack
- [ ] Create new Pipeline job
- [ ] Configure Git repository
- [ ] Add credentials in Manage Credentials
- [ ] Set pipeline script from SCM
- [ ] Configure build triggers
- [ ] Run job

## Common Tasks

### Encode SSH Key for Secrets

```bash
# Linux/Mac
cat ~/.ssh/id_rsa | base64 -w 0

# Windows (PowerShell)
[Convert]::ToBase64String([System.IO.File]::ReadAllBytes("C:\Users\username\.ssh\id_rsa"))
```

### Trigger Manual Deployment

**GitHub Actions:**
- Go to Actions tab
- Select workflow
- Click "Run workflow"

**GitLab CI/CD:**
- Go to CI/CD → Pipelines
- Click "Play" on deploy job

**Bitbucket:**
- Go to Pipelines
- Click "Run" on deployment step

**Jenkins:**
- Click "Build Now"
- Or configure webhook for auto-trigger

### View Pipeline Logs

**GitHub Actions:**
- Actions tab → Workflow → Job → Step logs

**GitLab CI/CD:**
- CI/CD → Pipelines → Job → Logs

**Bitbucket:**
- Pipelines → Build → Logs

**Jenkins:**
- Build → Console Output

### Add New Secret

**GitHub Actions:**
```bash
gh secret set SECRET_NAME --body "secret_value"
```

**GitLab CI/CD:**
- Settings → CI/CD → Variables → Add variable

**Bitbucket:**
- Repository settings → Pipelines → Repository variables

**Jenkins:**
- Manage Jenkins → Manage Credentials → Add credentials

## Environment Variables Reference

```bash
# GitHub Actions
${{ github.ref }}           # Git reference
${{ github.sha }}           # Commit SHA
${{ github.actor }}         # User who triggered
${{ github.event_name }}    # Event type

# GitLab CI/CD
$CI_COMMIT_SHA              # Commit SHA
$CI_COMMIT_BRANCH           # Branch name
$CI_PROJECT_PATH            # Project path
$CI_REGISTRY                # Registry URL

# Bitbucket
$BITBUCKET_COMMIT           # Commit SHA
$BITBUCKET_BRANCH           # Branch name
$BITBUCKET_TAG              # Tag name

# Jenkins
$BUILD_NUMBER               # Build number
$GIT_BRANCH                 # Branch name
$GIT_COMMIT                 # Commit SHA
$WORKSPACE                  # Workspace directory
```

## Deployment Commands

### Build Docker Image

```bash
docker build -f Dockerfile -t image:tag .
```

### Push to Registry

```bash
docker login -u username -p password registry.com
docker push registry.com/image:tag
```

### Deploy with Docker Compose

```bash
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d
```

### SSH Deploy

```bash
ssh user@host "cd /app && docker pull image:tag && docker-compose up -d"
```

### Health Check

```bash
curl -f https://example.com/health
```

## Troubleshooting

### Build Fails

1. Check logs in CI/CD platform
2. Verify Docker build locally: `docker build .`
3. Check dependencies: `pnpm install`
4. Verify secrets are set
5. Check branch protection rules

### Deployment Fails

1. Verify SSH key is correct
2. Check server connectivity: `ssh user@host`
3. Verify Docker is running: `docker ps`
4. Check disk space: `df -h`
5. View container logs: `docker logs container-id`

### Secrets Not Working

1. Verify secret name matches exactly
2. Check secret is in correct scope
3. Verify user has permission
4. Re-create secret if needed
5. Check for special characters

### Performance Issues

1. Enable Docker layer caching
2. Use smaller base images
3. Parallelize jobs
4. Cache dependencies
5. Use artifact caching

## Useful Commands

```bash
# Test Docker build locally
docker build -f Dockerfile .

# Run container locally
docker run -p 3000:3000 image:tag

# View container logs
docker logs -f container-id

# SSH into server
ssh -i key.pem user@host

# Check server resources
ssh user@host "df -h && free -h && docker ps"

# Manual deployment
ssh user@host "cd /app && ./deploy.sh run"

# View Git log
git log --oneline -n 10

# Create version tag
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

## Recommended Workflow

1. **Feature Development**
   - Create feature branch from `develop`
   - Make changes
   - Push to remote
   - Create pull request
   - CI runs tests automatically

2. **Code Review**
   - Team reviews code
   - Request changes if needed
   - Approve when ready

3. **Merge to Develop**
   - Merge PR to `develop`
   - CI deploys to staging
   - Run smoke tests
   - Team tests in staging

4. **Release to Production**
   - Create version tag (v1.0.0)
   - CI builds and scans image
   - Manual approval required
   - Deploy to production
   - Health checks run
   - Notify team on Slack

## Security Best Practices

- ✅ Never commit secrets
- ✅ Use masked variables
- ✅ Rotate secrets regularly
- ✅ Use short-lived credentials
- ✅ Audit secret access
- ✅ Use SSH keys instead of passwords
- ✅ Enable branch protection
- ✅ Require code review
- ✅ Run security scans
- ✅ Monitor deployments

## Performance Tips

- ✅ Cache Docker layers
- ✅ Use Alpine images
- ✅ Parallelize jobs
- ✅ Cache dependencies
- ✅ Use artifact caching
- ✅ Skip unnecessary jobs
- ✅ Use conditional steps
- ✅ Optimize build order
- ✅ Remove unused images
- ✅ Monitor job duration

## Links & Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [GitLab CI/CD Docs](https://docs.gitlab.com/ee/ci/)
- [Bitbucket Pipelines Docs](https://support.atlassian.com/bitbucket-cloud/docs/get-started-with-bitbucket-pipelines/)
- [Jenkins Docs](https://www.jenkins.io/doc/)
- [Docker Docs](https://docs.docker.com/)
