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
          image 'node:8.16.0-alpine'
          args '''-v 
/var/lib/jenkins/workspace/smap-coding-challenge_master/frontend/app:/app
-v /var/lib/jenkins/workspace/smap-coding-challenge_master/node_modules:/app/dev/node_modules
-p 3000:8088'''
        }

      }
      steps {
        sh 'ls /app'
        sh 'cd /app/dev'
        fileExists 'node_modules'
        sh 'cd /app/dev && npm install'
      }
    }
  }
}