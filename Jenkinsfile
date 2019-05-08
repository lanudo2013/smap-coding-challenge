pipeline {
  agent {
    docker {
      image 'node:8.16.0-alpine'
      args '''-v 
/var/lib/jenkins/workspace/smap-coding-challenge_master/frontend/app:/app
-v /var/lib/jenkins/workspace/node_modules:/app/dev/node_modules
-e
npm_config_cache=npm-cache
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
        sh 'cd /app/dev && npm install --unsafe-perm=true --allow-root'
      }
    }
    stage('Start') {
      steps {
        sh 'cd /app/dev && npm run start --unsafe-perm &'
        sh 'sleep 10'
      }
    }
    stage('Check page') {
      steps {
        sh '''wget http://localhost:8088
'''
      }
    }
  }
}