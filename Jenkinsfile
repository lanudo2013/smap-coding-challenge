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
          args '''-v 
/var/lib/jenkins/workspace/smap-coding-challenge_master/frontend/app:/app'''
        }

      }
      steps {
        sh 'ls /app'
        sh 'cd /app/dev'
        sh 'cd /app/dev && npm install'
      }
    }
  }
}