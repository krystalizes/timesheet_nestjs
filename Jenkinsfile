pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
                sh 'mkdir -p ${WORKSPACE}/src/config/env'
                sh 'cp /projects/.env.development ${WORKSPACE}/src/config/env/'
            }
        }
        stage('Deploy') {
            steps {
                sh 'npm run start:dev'
            }
        }     
    }
}    
