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
          args '''-v 
/var/lib/jenkins/workspace/smap-coding-challenge_master/frontend/app:/app'''
          image 'node:8.16.0-alpine'
        }

      }
      steps {
        sh 'ls /app'
        sh 'cd /app/dev'
        sh 'cd /app/dev && npm install'
        sh 'cd /app/dev && npm run start'
      }
    }
  }
}