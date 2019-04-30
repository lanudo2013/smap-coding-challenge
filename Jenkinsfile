pipeline {
  agent any
  stages {
    stage('Checkout & Print files') {
      steps {
        sh 'ls'
      }
    }
    stage('Build') {
      agent {
        docker {
          image 'node:7-alpine'
          args '-v frontend/app:/app'
        }

      }
      steps {
        sh 'npm run build'
      }
    }
  }
}