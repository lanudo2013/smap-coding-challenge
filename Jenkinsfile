pipeline {
  agent {
    docker {
      image 'node:8.16.0-alpine'
      args '''-v 
/var/lib/jenkins/workspace/smap-coding-challenge_master/frontend/app:/app
-v /var/lib/jenkins/workspace/node_modules:/app/dev/node_modules
-p
3001:8088'''
    }

  }
  stages {
    stage('Checkout & Print files') {
      steps {
        sh 'ls /app/dev'
      }
    }
    stage('Check node modules') {
      when {
        expression {
          return fileExists('/app/dev/node_modules/vue')
        }

      }
      steps {
        echo 'Exists'
      }
    }
    stage('Build') {
      when {
        not {
          expression {
            return fileExists('/app/dev/node_modules/vue')
          }

        }

      }
      steps {
        sh 'ls /app/dev'
        sh 'cd /app/dev && npm install'
      }
    }
    stage('Start') {
      steps {
        sh 'cd /app/dev && npm run start &'
      }
    }
  }
}