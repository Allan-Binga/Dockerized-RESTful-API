/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any
    tools {
        nodejs 'nodejs 23' //VERSION
    }

    stages {
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
    }

    post {
        success {
            slackSend(channel: '#building-and-testing', color: 'good', message: 'Job succeeded!')
        }
        failure {
            /* groovylint-disable-next-line DuplicateStringLiteral, LineLength */
            slackSend(channel: '#building-and-testing', color: 'danger', message: "Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' failed.")
        }
    }
}
