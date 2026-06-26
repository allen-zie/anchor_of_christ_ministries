#!/bin/bash

# Deployment script for Anchor of Christ International Ministries
# This script automates the Docker build and deployment process

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="anchor-of-christ"
IMAGE_TAG="${1:-latest}"
CONTAINER_NAME="anchor-of-christ-app"
PORT="${2:-3000}"
REGISTRY="${REGISTRY:-}"

# Functions
print_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    print_header "Checking Prerequisites"
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed"
        exit 1
    fi
    print_success "Docker is installed"
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed"
        exit 1
    fi
    print_success "Docker Compose is installed"
}

# Build Docker image
build_image() {
    print_header "Building Docker Image"
    
    local dockerfile="${1:-Dockerfile}"
    
    if [ ! -f "$dockerfile" ]; then
        print_error "Dockerfile not found: $dockerfile"
        exit 1
    fi
    
    echo "Building image: ${IMAGE_NAME}:${IMAGE_TAG}"
    docker build -f "$dockerfile" -t "${IMAGE_NAME}:${IMAGE_TAG}" .
    
    if [ $? -eq 0 ]; then
        print_success "Docker image built successfully"
    else
        print_error "Failed to build Docker image"
        exit 1
    fi
}

# Tag image for registry
tag_for_registry() {
    if [ -z "$REGISTRY" ]; then
        print_warning "No registry specified, skipping registry tagging"
        return
    fi
    
    print_header "Tagging Image for Registry"
    
    local registry_image="${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
    docker tag "${IMAGE_NAME}:${IMAGE_TAG}" "$registry_image"
    print_success "Image tagged as: $registry_image"
}

# Push image to registry
push_to_registry() {
    if [ -z "$REGISTRY" ]; then
        print_warning "No registry specified, skipping push"
        return
    fi
    
    print_header "Pushing Image to Registry"
    
    local registry_image="${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
    docker push "$registry_image"
    
    if [ $? -eq 0 ]; then
        print_success "Image pushed to registry: $registry_image"
    else
        print_error "Failed to push image to registry"
        exit 1
    fi
}

# Stop existing container
stop_container() {
    print_header "Stopping Existing Container"
    
    if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        echo "Stopping container: $CONTAINER_NAME"
        docker stop "$CONTAINER_NAME" 2>/dev/null || true
        docker rm "$CONTAINER_NAME" 2>/dev/null || true
        print_success "Container stopped and removed"
    else
        print_warning "No existing container found"
    fi
}

# Run container
run_container() {
    print_header "Running Container"
    
    echo "Starting container: $CONTAINER_NAME"
    docker run -d \
        --name "$CONTAINER_NAME" \
        --restart unless-stopped \
        -p "${PORT}:3000" \
        -e NODE_ENV=production \
        "${IMAGE_NAME}:${IMAGE_TAG}"
    
    if [ $? -eq 0 ]; then
        print_success "Container started successfully"
        sleep 2
        
        # Check container status
        if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
            print_success "Container is running"
            print_success "Application available at: http://localhost:${PORT}"
        else
            print_error "Container failed to start"
            docker logs "$CONTAINER_NAME"
            exit 1
        fi
    else
        print_error "Failed to start container"
        exit 1
    fi
}

# Run with Docker Compose
run_compose() {
    print_header "Running with Docker Compose"
    
    local compose_file="${1:-docker-compose.yml}"
    
    if [ ! -f "$compose_file" ]; then
        print_error "Docker Compose file not found: $compose_file"
        exit 1
    fi
    
    docker-compose -f "$compose_file" down 2>/dev/null || true
    docker-compose -f "$compose_file" up -d
    
    if [ $? -eq 0 ]; then
        print_success "Services started with Docker Compose"
        sleep 2
        docker-compose -f "$compose_file" ps
    else
        print_error "Failed to start services with Docker Compose"
        exit 1
    fi
}

# Show logs
show_logs() {
    print_header "Container Logs"
    docker logs -f "$CONTAINER_NAME"
}

# Show usage
show_usage() {
    cat << EOF
Usage: $0 [OPTIONS]

OPTIONS:
    build               Build Docker image
    run                 Build and run container
    compose             Run with Docker Compose
    compose-prod        Run production Docker Compose
    stop                Stop running container
    logs                Show container logs
    push                Push image to registry
    clean               Remove image and container
    help                Show this help message

ENVIRONMENT VARIABLES:
    REGISTRY            Docker registry URL (e.g., docker.io/username)
    IMAGE_TAG           Docker image tag (default: latest)
    PORT                Port to expose (default: 3000)

EXAMPLES:
    $0 build                           # Build image
    $0 run                             # Build and run
    $0 compose                         # Run with Docker Compose
    REGISTRY=docker.io/user $0 push   # Push to registry
    $0 stop                            # Stop container
    $0 logs                            # Show logs

EOF
}

# Main script
main() {
    local command="${1:-help}"
    
    case "$command" in
        build)
            check_prerequisites
            build_image "Dockerfile"
            ;;
        run)
            check_prerequisites
            build_image "Dockerfile"
            stop_container
            run_container
            ;;
        compose)
            check_prerequisites
            run_compose "docker-compose.yml"
            ;;
        compose-prod)
            check_prerequisites
            run_compose "docker-compose.prod.yml"
            ;;
        stop)
            check_prerequisites
            stop_container
            ;;
        logs)
            check_prerequisites
            show_logs
            ;;
        push)
            check_prerequisites
            build_image "Dockerfile"
            tag_for_registry
            push_to_registry
            ;;
        clean)
            check_prerequisites
            stop_container
            docker rmi "${IMAGE_NAME}:${IMAGE_TAG}" 2>/dev/null || true
            print_success "Cleanup completed"
            ;;
        help|--help|-h)
            show_usage
            ;;
        *)
            print_error "Unknown command: $command"
            show_usage
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
