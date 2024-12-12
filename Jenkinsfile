pipeline {
    agent any
    tools {
        nodejs "nodejs 23" //VERSION
    }
    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
        SERVERLESS_ACCESS_KEY = credentials('serverless-access-key')
        DOCKER_USERNAME = credentials('docker-username')
        DOCKER_PASSWORD = credentials('docker-password')
    }
    stages {
        stage('Checkout code') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], userRemoteConfigs: [[url: 'https://github.com/Allan-Binga/Dockerized-RESTful-API']]])
            }
        }
        stage('Setup Node.js') {
            steps {
                withEnv(['NODE_VERSION=20.x']) {
                    sh 'nvm install $NODE_VERSION'
                    sh 'nvm use $NODE_VERSION'
                    sh 'npm install'
                }
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Install Serverless Framework') {
            steps {
                sh 'npm install -g serverless'
            }
        }
        stage('Deploy to AWS') {
            when {
                branch 'master'
            }
            steps {
                sh '''
                npx serverless deploy --force
                '''
            }
        }
        stage('Build Docker image') {
            steps {
                sh 'docker build -t allanbinga/restfulapi:v1.0.0 .'
            }
        }
        stage('Log in to DockerHub') {
            steps {
                sh '''
                echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                '''
            }
        }
        stage('Push Docker image to DockerHub') {
            steps {
                sh 'docker push allanbinga/restfulapi:v1.0.0'
            }
        }
    }
    // post {
    //     success {
    //         script {
    //             def emailBody = """
    //             The deployment to AWS and DockerHub was successful for the latest push to the master branch. All jobs completed without errors.
    //             """
    //             emailext (
    //                 subject: "Successful job completion.",
    //                 body: emailBody,
    //                 to: "devbingacodes@gmail.com",
    //                 from: "allanbinga73@gmail.com",
    //                 mimeType: 'text/html',
    //                 replyTo: "allanbinga73@gmail.com"
    //             )
    //         }
    //     }
    // }
}
