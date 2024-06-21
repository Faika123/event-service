pipeline {
    agent any
    environment {
        DOCKER_PATH = "C:\\Program Files\\Docker\\cli-plugins"
        NODEJS_PATH = "C:\\Program Files\\nodejs"
        SONAR_SCANNER_HOME = "C:\\Program Files\\sonar-scanner-5.0.1.3006-windows" 
        PATH = "${SONAR_SCANNER_HOME}\\bin;${NODEJS_PATH};${DOCKER_PATH};${env.PATH}"
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
                    withSonarQubeEnv('SONARQUBE') {
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
