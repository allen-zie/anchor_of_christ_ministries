# Docker Deployment Guide - Anchor of Christ International Ministries

This guide provides comprehensive instructions for building, testing, and deploying the Anchor of Christ Ministries website using Docker.

## Prerequisites

- Docker installed (v20.10+)
- Docker Compose installed (v2.0+)
- Git (for cloning the repository)

**Installation Links:**
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Quick Start

### 1. Build the Docker Image

```bash
docker build -t anchor-of-christ:latest .
```

### 2. Run the Container

```bash
docker run -p 3000:3000 anchor-of-christ:latest
```

The application will be available at `http://localhost:3000`

### 3. Using Docker Compose (Recommended)

```bash
# Build and start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

## Dockerfile Explanation

The Dockerfile uses a **multi-stage build** approach for optimal image size and performance:

### Stage 1: Builder
- Uses `node:22-alpine` (lightweight base image)
- Installs pnpm package manager
- Installs all dependencies (including dev dependencies)
- Builds the application (TypeScript compilation, bundling)

### Stage 2: Runtime
- Uses a fresh `node:22-alpine` image
- Copies only the built artifacts from Stage 1
- Installs only production dependencies
- Reduces final image size by ~70%

**Benefits:**
- ✅ Smaller image size (~300MB vs ~1GB)
- ✅ Faster deployment
- ✅ Better security (no build tools in production)
- ✅ Faster startup time

## Environment Variables

Create a `.env` file in the project root if needed:

```bash
NODE_ENV=production
PORT=3000
```

Pass environment variables to Docker:

```bash
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  anchor-of-christ:latest
```

## Building for Different Platforms

### Build for ARM64 (Apple Silicon, AWS Graviton, etc.)

```bash
docker build --platform linux/arm64 -t anchor-of-christ:latest-arm64 .
```

### Build for AMD64 (Standard Linux servers)

```bash
docker build --platform linux/amd64 -t anchor-of-christ:latest-amd64 .
```

### Build Multi-Platform Image (requires buildx)

```bash
docker buildx build --platform linux/amd64,linux/arm64 \
  -t anchor-of-christ:latest \
  --push .
```

## Health Checks

The Docker image includes a built-in health check that:
- Runs every 30 seconds
- Times out after 3 seconds
- Retries up to 3 times
- Waits 5 seconds before first check

Check container health:

```bash
docker ps
# Look for "healthy" or "unhealthy" status
```

## Deployment Scenarios

### 1. Local Development

```bash
docker-compose up -d
# Application runs at http://localhost:3000
```

### 2. Production on Single Server

```bash
# Build image
docker build -t anchor-of-christ:v1.0 .

# Run with restart policy
docker run -d \
  --name anchor-of-christ \
  --restart unless-stopped \
  -p 3000:3000 \
  anchor-of-christ:v1.0
```

### 3. Docker Swarm Deployment

```bash
# Initialize swarm
docker swarm init

# Create service
docker service create \
  --name anchor-of-christ \
  --publish 3000:3000 \
  --replicas 3 \
  anchor-of-christ:latest
```

### 4. Kubernetes Deployment

Create `k8s-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: anchor-of-christ
spec:
  replicas: 3
  selector:
    matchLabels:
      app: anchor-of-christ
  template:
    metadata:
      labels:
        app: anchor-of-christ
    spec:
      containers:
      - name: app
        image: anchor-of-christ:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        livenessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 30
        readinessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: anchor-of-christ-service
spec:
  selector:
    app: anchor-of-christ
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
```

Deploy to Kubernetes:

```bash
kubectl apply -f k8s-deployment.yaml
```

## Docker Registry (Push to Docker Hub)

### 1. Tag the Image

```bash
docker tag anchor-of-christ:latest yourusername/anchor-of-christ:latest
docker tag anchor-of-christ:latest yourusername/anchor-of-christ:v1.0
```

### 2. Login to Docker Hub

```bash
docker login
```

### 3. Push the Image

```bash
docker push yourusername/anchor-of-christ:latest
docker push yourusername/anchor-of-christ:v1.0
```

### 4. Pull and Run from Registry

```bash
docker run -p 3000:3000 yourusername/anchor-of-christ:latest
```

## Common Docker Commands

```bash
# Build image
docker build -t anchor-of-christ:latest .

# List images
docker images

# Run container
docker run -p 3000:3000 anchor-of-christ:latest

# List running containers
docker ps

# View logs
docker logs <container-id>
docker logs -f <container-id>  # Follow logs

# Stop container
docker stop <container-id>

# Remove container
docker rm <container-id>

# Remove image
docker rmi anchor-of-christ:latest

# Execute command in running container
docker exec -it <container-id> /bin/sh

# View container stats
docker stats <container-id>

# Inspect container
docker inspect <container-id>
```

## Docker Compose Commands

```bash
# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose stop

# Stop and remove services
docker-compose down

# Rebuild services
docker-compose up -d --build

# View service status
docker-compose ps

# Execute command in service
docker-compose exec app /bin/sh
```

## Troubleshooting

### Container exits immediately

```bash
# Check logs
docker logs <container-id>

# Run with interactive terminal
docker run -it anchor-of-christ:latest /bin/sh
```

### Port already in use

```bash
# Use different port
docker run -p 8000:3000 anchor-of-christ:latest

# Find process using port
lsof -i :3000
kill -9 <PID>
```

### Build fails

```bash
# Clear Docker cache
docker system prune -a

# Rebuild
docker build --no-cache -t anchor-of-christ:latest .
```

### Health check failing

```bash
# Check container logs
docker logs <container-id>

# Verify application is running
docker exec <container-id> curl http://localhost:3000
```

## Performance Optimization

### 1. Use Alpine Images
The Dockerfile already uses `node:22-alpine` for smaller images.

### 2. Layer Caching
Order Dockerfile commands from least to most frequently changed:
- System dependencies
- Package files (package.json)
- Source code

### 3. Multi-stage Builds
Already implemented to reduce final image size.

### 4. Resource Limits

```bash
docker run -p 3000:3000 \
  --memory="512m" \
  --cpus="1" \
  anchor-of-christ:latest
```

## Security Best Practices

1. **Use specific Node.js versions** (not `latest`)
   - Current: `node:22-alpine`

2. **Run as non-root user** (optional enhancement):
   ```dockerfile
   RUN addgroup -g 1001 -S nodejs
   RUN adduser -S nodejs -u 1001
   USER nodejs
   ```

3. **Scan images for vulnerabilities**:
   ```bash
   docker scan anchor-of-christ:latest
   ```

4. **Keep dependencies updated**:
   ```bash
   pnpm update
   docker build -t anchor-of-christ:latest .
   ```

5. **Use secrets management** for sensitive data (not in Dockerfile)

## Monitoring and Logging

### View Container Logs

```bash
# Real-time logs
docker logs -f <container-id>

# Last 100 lines
docker logs --tail 100 <container-id>

# Logs with timestamps
docker logs -t <container-id>
```

### Container Metrics

```bash
# CPU and memory usage
docker stats <container-id>

# Detailed inspection
docker inspect <container-id>
```

## Continuous Integration/Deployment

### GitHub Actions Example

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      
      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      
      - name: Build and push
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: ${{ secrets.DOCKER_USERNAME }}/anchor-of-christ:latest
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Node.js Docker Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Docker Security](https://docs.docker.com/engine/security/)

## Support

For issues or questions:
1. Check Docker logs: `docker logs <container-id>`
2. Verify image: `docker inspect anchor-of-christ:latest`
3. Test locally: `docker-compose up`
4. Review Dockerfile for build errors
