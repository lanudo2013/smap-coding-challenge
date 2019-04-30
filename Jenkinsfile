pipeline {
  agent {
    docker {
      image 'node:8.16.0-alpine'
      args '''-v 
/var/lib/jenkins/workspace/smap-coding-challenge_master/frontend/app:/app
-v /var/lib/jenkins/workspace/smap-coding-challenge_master/node_modules:/app/dev/node_modules
-p 3000:8088'''
    }

  }
  stages {
    stage('Checkout & Print files') {
      steps {
        sh 'ls'
      }
    }
    stage('Build') {
      when {
        not {
          expression {
            return fileExists('node_modules')
          }

        }

      }
      steps {
        sh 'ls /app'
        sh 'cd /app/dev'
        sh 'cd /app/dev && npm install'
      }
    }
    stage('Start') {
      steps {
        sh 'cd /app/dev && npm run start'
      }
    }
  }
}