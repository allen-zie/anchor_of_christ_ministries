// Jenkins Pipeline for Anchor of Christ International Ministries
// This Jenkinsfile implements a complete CI/CD pipeline

pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 1, unit: 'HOURS')
        timestamps()
    }

    environment {
        REGISTRY = 'docker.io'
        IMAGE_NAME = 'anchor-of-christ'
        IMAGE_TAG = "${BUILD_NUMBER}"
        DOCKER_CREDENTIALS = credentials('docker-credentials')
        STAGING_HOST = credentials('staging-host')
        PROD_HOST = credentials('prod-host')
        SLACK_WEBHOOK = credentials('slack-webhook')
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "Checking out code from repository..."
                    checkout scm
                }
            }
        }

        stage('Setup') {
            steps {
                script {
                    echo "Setting up environment..."
                    sh '''
                        npm install -g pnpm@10.4.1
                        pnpm install --frozen-lockfile
                    '''
                }
            }
        }

        stage('Lint') {
            steps {
                script {
                    echo "Running linting checks..."
                    sh 'pnpm run lint --max-warnings 0' || true
                }
            }
        }

        stage('Type Check') {
            steps {
                script {
                    echo "Running TypeScript type checks..."
                    sh 'pnpm run check'
                }
            }
        }

        stage('Security Audit') {
            steps {
                script {
                    echo "Running security audit..."
                    sh 'pnpm audit --audit-level=moderate' || true
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    echo "Building application..."
                    sh 'pnpm run build'
                }
            }
        }

        stage('Build Docker Image') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                    tag 'v*'
                }
            }
            steps {
                script {
                    echo "Building Docker image..."
                    sh '''
                        docker build -f Dockerfile -t ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} .
                        docker tag ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} ${REGISTRY}/${IMAGE_NAME}:latest
                    '''
                }
            }
        }

        stage('Push to Registry') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                    tag 'v*'
                }
            }
            steps {
                script {
                    echo "Pushing Docker image to registry..."
                    sh '''
                        echo "${DOCKER_CREDENTIALS_PSW}" | docker login -u "${DOCKER_CREDENTIALS_USR}" --password-stdin ${REGISTRY}
                        docker push ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
                        docker push ${REGISTRY}/${IMAGE_NAME}:latest
                        docker logout ${REGISTRY}
                    '''
                }
            }
        }

        stage('Security Scan') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                    tag 'v*'
                }
            }
            steps {
                script {
                    echo "Running security scan on Docker image..."
                    sh '''
                        docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                            aquasec/trivy image --exit-code 0 --severity HIGH,CRITICAL \
                            ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
                    ''' || true
                }
            }
        }

        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    echo "Deploying to staging environment..."
                    sh '''
                        ssh -i ${STAGING_HOST_KEY} ${STAGING_HOST_USR}@${STAGING_HOST_HOSTNAME} "
                            cd /app/anchor-of-christ &&
                            docker pull ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} &&
                            docker-compose -f docker-compose.prod.yml down &&
                            docker-compose -f docker-compose.prod.yml up -d &&
                            docker system prune -f
                        "
                    '''
                }
            }
        }

        stage('Smoke Test Staging') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    echo "Running smoke tests on staging..."
                    sh '''
                        for i in {1..30}; do
                            if curl -f https://staging.anchor-of-christ.com/; then
                                echo "Staging is healthy!"
                                exit 0
                            fi
                            echo "Attempt $i/30 failed, retrying..."
                            sleep 10
                        done
                        echo "Staging health check failed!"
                        exit 1
                    '''
                }
            }
        }

        stage('Deploy to Production') {
            when {
                tag 'v*'
            }
            input {
                message "Deploy to production?"
                ok "Deploy"
            }
            steps {
                script {
                    echo "Deploying to production environment..."
                    sh '''
                        ssh -i ${PROD_HOST_KEY} ${PROD_HOST_USR}@${PROD_HOST_HOSTNAME} "
                            cd /app/anchor-of-christ &&
                            docker pull ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} &&
                            docker-compose -f docker-compose.prod.yml down &&
                            docker-compose -f docker-compose.prod.yml up -d &&
                            docker system prune -f
                        "
                    '''
                }
            }
        }

        stage('Health Check Production') {
            when {
                tag 'v*'
            }
            steps {
                script {
                    echo "Running health checks on production..."
                    sh '''
                        for i in {1..30}; do
                            if curl -f https://anchor-of-christ.com/health; then
                                echo "Production is healthy!"
                                exit 0
                            fi
                            echo "Attempt $i/30 failed, retrying..."
                            sleep 10
                        done
                        echo "Production health check failed!"
                        exit 1
                    '''
                }
            }
        }
    }

    post {
        always {
            script {
                echo "Cleaning up..."
                sh 'docker system prune -f' || true
            }
        }

        success {
            script {
                echo "Pipeline succeeded!"
                sh '''
                    curl -X POST ${SLACK_WEBHOOK} \
                        -H 'Content-Type: application/json' \
                        -d '{
                            "text": "✅ Pipeline succeeded",
                            "attachments": [{
                                "color": "good",
                                "fields": [
                                    {"title": "Job", "value": "'${JOB_NAME}'", "short": true},
                                    {"title": "Build", "value": "'${BUILD_NUMBER}'", "short": true},
                                    {"title": "Branch", "value": "'${GIT_BRANCH}'", "short": true}
                                ]
                            }]
                        }'
                ''' || true
            }
        }

        failure {
            script {
                echo "Pipeline failed!"
                sh '''
                    curl -X POST ${SLACK_WEBHOOK} \
                        -H 'Content-Type: application/json' \
                        -d '{
                            "text": "❌ Pipeline failed",
                            "attachments": [{
                                "color": "danger",
                                "fields": [
                                    {"title": "Job", "value": "'${JOB_NAME}'", "short": true},
                                    {"title": "Build", "value": "'${BUILD_NUMBER}'", "short": true},
                                    {"title": "Branch", "value": "'${GIT_BRANCH}'", "short": true}
                                ]
                            }]
                        }'
                ''' || true
            }
        }

        unstable {
            script {
                echo "Pipeline is unstable"
            }
        }
    }
}
