pipeline {
    agent any

    environment {
        FRONTEND_DIR = 'web'
        BACKEND_DIR = 'server'
        FRONTEND_IMAGE = 'frontend-image'
        BACKEND_IMAGE = 'backend-image'
    }

    stages {
        stage('Checkout') {
            steps {
                // checkout scm
                git branch: 'master', url: 'https://github.com/DeepuSaji/My_Works.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh 'npm install'
                    sh 'docker build -t $BACKEND_IMAGE .'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh 'docker build -t $FRONTEND_IMAGE .'
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                // Stop old containers (if they exist)
                sh 'docker rm -f backend-container || true'
                sh 'docker rm -f frontend-container || true'

                // Run backend on port 3000
                sh 'docker run -d -p 3000:3000 --name backend-container $BACKEND_IMAGE'

                // Run frontend on port 8080 (mapped from nginx 80)
                sh 'docker run -d -p 8080:80 --name frontend-container $FRONTEND_IMAGE'
            }
        }
    }

    post {
        always {
            sh 'docker ps'
        }
    }
}
