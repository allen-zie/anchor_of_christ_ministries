# CI/CD Integration Guide - Anchor of Christ International Ministries

This guide provides comprehensive instructions for integrating the Docker setup with various CI/CD platforms.

## Table of Contents

1. [GitHub Actions](#github-actions)
2. [GitLab CI/CD](#gitlab-cicd)
3. [Bitbucket Pipelines](#bitbucket-pipelines)
4. [Jenkins](#jenkins)
5. [General CI/CD Best Practices](#general-cicd-best-practices)
6. [Secrets Management](#secrets-management)
7. [Monitoring & Notifications](#monitoring--notifications)

---

## GitHub Actions

### Setup Instructions

#### 1. Create Workflow Files

The workflow files are already created in `.github/workflows/`:
- `docker-build-deploy.yml` - Main Docker build and deployment pipeline
- `tests.yml` - Testing and code quality checks

#### 2. Configure Secrets

Go to **Settings → Secrets and variables → Actions** and add:

```
STAGING_HOST          # Staging server hostname
STAGING_USER          # Staging SSH username
STAGING_SSH_KEY       # Staging SSH private key (base64 encoded)
PROD_HOST             # Production server hostname
PROD_USER             # Production SSH username
PROD_SSH_KEY          # Production SSH private key (base64 encoded)
SLACK_WEBHOOK         # Slack webhook URL for notifications
```

#### 3. Encode SSH Keys for GitHub

```bash
# Encode private key to base64
cat ~/.ssh/id_rsa | base64 -w 0 > ssh_key_base64.txt

# Copy the content and paste into GitHub Secrets
```

#### 4. Workflow Triggers

**Docker Build & Deploy** triggers on:
- Push to `main` or `develop` branches
- Push of version tags (`v*`)
- Pull requests to `main` or `develop`

**Tests** triggers on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

#### 5. Deployment Flow

```
Push to develop
    ↓
Tests & Linting
    ↓
Build Docker Image
    ↓
Security Scan
    ↓
Deploy to Staging
    ↓
Smoke Tests

---

Tag Release (v1.0.0)
    ↓
Tests & Linting
    ↓
Build Docker Image
    ↓
Security Scan
    ↓
Deploy to Production (Manual Approval)
    ↓
Health Checks
```

#### 6. GitHub Actions Features

- ✅ Multi-stage builds for optimization
- ✅ Automatic image tagging
- ✅ Container registry caching
- ✅ Security scanning with Trivy
- ✅ Automated deployment to staging
- ✅ Manual approval for production
- ✅ Slack notifications
- ✅ Automatic cleanup of old images

---

## GitLab CI/CD

### Setup Instructions

#### 1. Create Pipeline File

The `.gitlab-ci.yml` file is already created in the project root.

#### 2. Configure CI/CD Variables

Go to **Settings → CI/CD → Variables** and add:

```
STAGING_HOST          # Staging server hostname
STAGING_USER          # Staging SSH username
STAGING_SSH_KEY       # Staging SSH private key (base64 encoded)
PROD_HOST             # Production server hostname
PROD_USER             # Production SSH username
PROD_SSH_KEY          # Production SSH private key (base64 encoded)
CI_REGISTRY_USER      # GitLab registry username
CI_REGISTRY_PASSWORD  # GitLab registry password
```

#### 3. Enable Container Registry

Go to **Settings → Integrations → Container Registry** and enable it.

#### 4. Pipeline Stages

```
Test Stage
├── Lint
├── Type Check
├── Build Check
├── Security Audit
└── Dependency Check

Build Stage
├── Build Docker Image
└── Build Production Docker Image

Security Stage
├── Trivy Scan
└── Container Scan

Deploy Staging (Manual)
├── Deploy to Staging
└── Smoke Tests

Deploy Production (Manual)
├── Deploy to Production
└── Health Checks
```

#### 5. Running Pipelines

**Automatic:**
- Every push to `main` or `develop` runs tests and builds

**Manual:**
- Deploy to staging: Click "Play" button on deploy-staging job
- Deploy to production: Click "Play" button on deploy-production job

#### 6. GitLab CI/CD Features

- ✅ Docker-in-Docker builds
- ✅ Automatic registry integration
- ✅ Environment tracking
- ✅ Deployment history
- ✅ Rollback capability
- ✅ Manual approval gates
- ✅ Security scanning

---

## Bitbucket Pipelines

### Setup Instructions

#### 1. Create Pipeline File

The `bitbucket-pipelines.yml` file is already created in the project root.

#### 2. Configure Repository Variables

Go to **Repository settings → Pipelines → Repository variables** and add:

```
DOCKER_USERNAME       # Docker Hub username
DOCKER_PASSWORD       # Docker Hub password
DOCKER_REGISTRY       # Docker registry URL
DOCKER_IMAGE          # Docker image name
STAGING_HOST          # Staging server hostname
STAGING_USER          # Staging SSH username
STAGING_SSH_KEY       # Staging SSH private key (base64 encoded)
PROD_HOST             # Production server hostname
PROD_USER             # Production SSH username
PROD_SSH_KEY          # Production SSH private key (base64 encoded)
```

#### 3. Enable Pipelines

Go to **Repository settings → Pipelines** and enable Bitbucket Pipelines.

#### 4. Pipeline Definitions

```yaml
default:        # Runs on all branches
  - Lint
  - Type Check
  - Build
  - Security Audit

develop:        # Runs on develop branch
  - Lint
  - Type Check
  - Build
  - Security Audit
  - Docker Build
  - Security Scan
  - Deploy to Staging
  - Smoke Tests

main:           # Runs on main branch
  - Lint
  - Type Check
  - Build
  - Security Audit
  - Docker Build
  - Security Scan

tags (v*):      # Runs on version tags
  - Lint
  - Type Check
  - Build
  - Security Audit
  - Docker Build (Production)
  - Security Scan
  - Deploy to Production
  - Health Checks

pull-requests:  # Runs on pull requests
  - Lint
  - Type Check
  - Build
  - Security Audit
```

#### 5. Bitbucket Pipelines Features

- ✅ Docker support built-in
- ✅ Parallel steps
- ✅ Custom Docker images
- ✅ Caching support
- ✅ Artifact management
- ✅ Environment variables
- ✅ SSH key support

---

## Jenkins

### Setup Instructions

#### 1. Create Jenkinsfile

The `Jenkinsfile` is already created in the project root.

#### 2. Create Jenkins Job

1. Create a new **Pipeline** job
2. Configure source code management (Git)
3. Set pipeline script to read from `Jenkinsfile`

#### 3. Configure Credentials

Go to **Manage Jenkins → Manage Credentials** and add:

```
docker-credentials        # Docker Hub credentials
staging-host              # Staging server details
prod-host                 # Production server details
slack-webhook             # Slack webhook URL
```

#### 4. Pipeline Stages

```
Checkout
    ↓
Setup (Install dependencies)
    ↓
Lint
    ↓
Type Check
    ↓
Security Audit
    ↓
Build
    ↓
Build Docker Image (if main/develop/tag)
    ↓
Push to Registry (if main/develop/tag)
    ↓
Security Scan (if main/develop/tag)
    ↓
Deploy to Staging (if develop)
    ↓
Smoke Test Staging (if develop)
    ↓
Deploy to Production (if tag + manual approval)
    ↓
Health Check Production (if tag)
```

#### 5. Jenkins Configuration

**Configure Build Triggers:**
- Poll SCM: `H/15 * * * *` (every 15 minutes)
- Or use GitHub/GitLab webhooks

**Configure Build Parameters:**
- REGISTRY: Docker registry URL
- IMAGE_NAME: Docker image name
- IMAGE_TAG: Auto-generated from build number

#### 6. Jenkins Features

- ✅ Declarative pipelines
- ✅ Parallel execution
- ✅ Post-build actions
- ✅ Slack notifications
- ✅ Build artifacts
- ✅ Email notifications
- ✅ Manual approval gates

---

## General CI/CD Best Practices

### 1. Branch Strategy

```
main (Production)
├── Protected branch
├── Requires PR review
└── Auto-deploy on tag

develop (Staging)
├── Protected branch
├── Requires PR review
└── Auto-deploy on push

feature/* (Feature branches)
├── Run tests only
└── No deployment
```

### 2. Semantic Versioning

Use semantic versioning for releases:

```bash
# Create a version tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

This triggers production deployment.

### 3. Commit Messages

Use conventional commits:

```
feat: Add new feature
fix: Fix a bug
docs: Update documentation
style: Code style changes
refactor: Refactor code
test: Add tests
chore: Maintenance
```

### 4. Pull Request Workflow

1. Create feature branch from `develop`
2. Make changes and commit
3. Push to remote
4. Create pull request
5. Wait for CI checks to pass
6. Request review
7. Merge after approval
8. Delete branch

### 5. Deployment Checklist

- [ ] All tests passing
- [ ] Code review approved
- [ ] Security scan passed
- [ ] No breaking changes
- [ ] Documentation updated
- [ ] Version bumped
- [ ] Changelog updated
- [ ] Release notes prepared

---

## Secrets Management

### Best Practices

1. **Never commit secrets** to version control
2. **Use platform-specific secret managers**
3. **Rotate secrets regularly**
4. **Audit secret access**
5. **Use short-lived credentials**

### GitHub Secrets

```bash
# Create a secret
gh secret set MY_SECRET --body "secret_value"

# List secrets
gh secret list

# Delete a secret
gh secret delete MY_SECRET
```

### GitLab CI/CD Variables

- **Protected variables**: Only available on protected branches
- **Masked variables**: Hidden in logs
- **File variables**: Stored as files

### Bitbucket Repository Variables

- **Secured**: Encrypted at rest
- **Visible to admins only**
- **Rotated regularly**

### Jenkins Credentials

- Use Jenkins Credentials Plugin
- Store in Jenkins credential store
- Encrypt with Jenkins master key
- Audit credential usage

---

## Monitoring & Notifications

### Slack Integration

#### GitHub Actions

```yaml
- name: Notify Slack
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

#### GitLab CI/CD

```yaml
notify_slack:
  stage: deploy
  script:
    - |
      curl -X POST $SLACK_WEBHOOK \
        -H 'Content-Type: application/json' \
        -d '{"text":"Deployment completed"}'
```

#### Jenkins

```groovy
post {
    always {
        slackSend(
            color: currentBuild.result == 'SUCCESS' ? 'good' : 'danger',
            message: "Build ${env.BUILD_NUMBER} ${currentBuild.result}"
        )
    }
}
```

### Email Notifications

#### GitHub Actions

```yaml
- name: Send Email
  uses: dawidd6/action-send-mail@v3
  with:
    server_address: smtp.gmail.com
    server_port: 465
    username: ${{ secrets.EMAIL_USERNAME }}
    password: ${{ secrets.EMAIL_PASSWORD }}
    subject: Build ${{ job.status }}
    to: team@example.com
```

#### Jenkins

```groovy
post {
    failure {
        emailext(
            subject: "Build Failed: ${env.JOB_NAME}",
            body: "Build failed. Check console output at ${env.BUILD_URL}",
            to: "team@example.com"
        )
    }
}
```

### Health Monitoring

```bash
# Add health check endpoint
curl -f https://anchor-of-christ.com/health

# Response should be:
# HTTP 200 OK
# {"status": "healthy"}
```

### Log Aggregation

Use ELK Stack, Datadog, or CloudWatch:

```yaml
logging:
  driver: "awslogs"
  options:
    awslogs-group: "/ecs/anchor-of-christ"
    awslogs-region: "us-east-1"
    awslogs-stream-prefix: "ecs"
```

---

## Troubleshooting

### Pipeline Fails at Build Stage

```bash
# Check Docker build locally
docker build -f Dockerfile .

# Check for syntax errors
docker build --no-cache -f Dockerfile .

# View build logs
docker logs <container-id>
```

### Deployment Fails

```bash
# SSH into server and check
ssh user@host

# Check Docker status
docker ps
docker logs <container-id>

# Check disk space
df -h

# Check memory
free -h
```

### Secrets Not Available

- Verify secret name matches exactly
- Check secret is in correct scope
- Verify user has permission to access
- Check secret hasn't expired

### Performance Issues

- Enable Docker layer caching
- Use smaller base images
- Parallelize jobs
- Cache dependencies
- Use artifact caching

---

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitLab CI/CD Documentation](https://docs.gitlab.com/ee/ci/)
- [Bitbucket Pipelines Documentation](https://support.atlassian.com/bitbucket-cloud/docs/get-started-with-bitbucket-pipelines/)
- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [CI/CD Best Practices](https://www.atlassian.com/continuous-delivery/continuous-integration)

---

## Support

For issues or questions:
1. Check platform-specific documentation
2. Review pipeline logs
3. Test locally with Docker
4. Check secrets configuration
5. Verify server connectivity
