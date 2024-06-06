pipeline {
    agent any
    environment {
        DOCKER_PATH = "C:\\Program Files\\Docker\\cli-plugins"
        NODEJS_PATH = "C:\\Program Files\\nodejs"
        PATH = "${DOCKER_PATH};${NODEJS_PATH};${env.PATH}"
    }
    stages {
        stage('Install Node.js and npm') {
            steps {
                script {
                    def nodejs = tool name: 'NODEJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodejs}/bin;${env.PATH}"
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

        stage('Build & Rename Docker Image') {
            steps {
                script {
                    bat "docker build -t evenements:latest ."
                    bat "docker tag evenements:latest faika/evenements:latest"
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // Clean up any existing container
                    bat "docker stop evenements_container_latest || exit 0"
                    bat "docker rm evenements_container_latest || exit 0"
                    
                    // Run the new container
                    bat "docker run -d -p 8336:3006 --name evenements_container_latest faika/evenements:latest"
                }
            }
        }

        stage('Publish Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        bat 'docker login -u %DOCKERHUB_USERNAME% -p %DOCKERHUB_PASSWORD%'
                        bat 'docker tag faika/evenements:latest faika/evenements:%BUILD_ID%'
                        bat 'docker push faika/evenements:%BUILD_ID%'
                        bat 'docker push faika/evenements:latest'
                    }
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
