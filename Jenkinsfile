/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any
    tools {
        nodejs 'nodejs 23' //VERSION
        dockerTool 'docker-latest'
    }
    environment {
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY') //CHANGED TO ACCOMODATE
        SERVERLESS_ACCESS_KEY = credentials('SERVERLESS_ACCESS_KEY')
        DOCKER_USERNAME = credentials('DOCKER_USERNAME')
        DOCKER_PASSWORD = credentials('DOCKER_PASSWORD')
    }
    stages {
        stage('Checkout code') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], userRemoteConfigs: [[url: 'https://github.com/Allan-Binga/Dockerized-RESTful-API']]])
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
}
