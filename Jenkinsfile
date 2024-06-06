pipeline {
    agent any

    environment {
        NODEJS_PATH = "C:\\Program Files\\nodejs"
        // Variables Docker
        DOCKER_IMAGE_NAME = "service_event"
        DOCKER_IMAGE_TAG = "latest"
        DOCKER_REGISTRY = "docker.io"
        DOCKER_CREDENTIALS_ID = "dockerhub"
        
        // Variables SonarQube
        SONARQUBE_URL = "http://localhost:9000"
        SONARQUBE_CREDENTIALS_ID = "sonarqube-credentials"
    }

    stages {
        stage('Install Node.js and npm') {
            steps {
                script {
                    def nodejs = tool name: 'NODEJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodejs}/bin:${env.PATH}"
                }
            }
        }
        
        stage('Checkout') {
            steps {
                script {
                    checkout scm
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'npm install'
                    sh 'npm run sonar'
                }
            }
        }

        stage('Unit Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}")
                }
            }
        }

        stage('Run Docker Image') {
            steps {
                script {
                    docker.image("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}").run()
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", "${DOCKER_CREDENTIALS_ID}") {
                        docker.image("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}").push()
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
