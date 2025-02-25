pipeline {
    agent any
    environment {
        PREV_BUILD_DIR = "${WORKSPACE}/../prev_build"
        COMMIT_HASH = sh(script: "git rev-parse --short ${GIT_COMMIT}", returnStdout: true).trim()
    }
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
                sh 'mkdir -p "${WORKSPACE}/src/config/env"'
                sh 'rm -f "${WORKSPACE}/src/config/env/.env.development"'
                sh 'cp /projects/.env.development "${WORKSPACE}/src/config/env/"'
                addBadge(text: "${COMMIT_HASH}")
            }
        }
        stage('Deploy') {
            steps {
                sh 'npm run start:dev'
                // echo "Build success"
            }
        }     
    }
    post {
        success {
            echo "Build successful, updating previous build backup..."
            sh 'rm -rf "${PREV_BUILD_DIR}"'
            sh 'mkdir -p "${PREV_BUILD_DIR}" && cp -r ${WORKSPACE}/* "${PREV_BUILD_DIR}"'
        }
        failure {
            echo "Build failed! Trying the previous build instead"
            script {
                if (fileExists("${PREV_BUILD_DIR}")) {
                    sh 'rm -rf ${WORKSPACE}/*'
                    sh 'cp -r ${PREV_BUILD_DIR}/* "${WORKSPACE}"'
                    echo "Restored previous build, redeploying..."
                    sh 'npm run start:dev'
                    // echo "Build previous success"
                } else {
                    echo "No previous build found!"
                }
            }
        }
    }
}    
