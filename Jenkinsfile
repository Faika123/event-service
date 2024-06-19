pipeline {
    agent any
    environment {
        DOCKER_PATH = "C:\\Program Files\\Docker\\cli-plugins"
        PATH = "${DOCKER_PATH}:${PATH}"
        NODEJS_PATH = "C:\\Program Files\\nodejs"
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
                script {
                    withSonarQubeEnv('SonarQube Test') {
                        bat 'npm run sonar'
                    }
                }
            }
        }
        
        stage('Build & Rename Docker Image') {
            steps {
                script {
                    bat "docker build -t evenements_service:latest ."
                    bat "docker tag evenements_service:latest faika/evenements_service:latest"
                }
            }
        }

        stage('Publish Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        bat 'docker login -u %DOCKERHUB_USERNAME% -p %DOCKERHUB_PASSWORD%'
                        bat 'docker tag faika/evenements_service:latest faika/evenements_service:%BUILD_ID%'
                        bat 'docker push faika/evenements_service:%BUILD_ID%'
                        bat 'docker push faika/evenements_service:latest'
                    }
                }
            }
        }
        stage('kubernetes Deployment') {
            steps {
                script {
                   bat 'kubectl apply -f event-deployment.yaml'
                   bat 'kubectl apply -f event-service.yaml' 
                }
            }
        }
    }
    post {
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
