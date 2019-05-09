pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
      args '-v "/var/lib/jenkins/workspace/smap_nodeModules:/app/dev/node_modules"'
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
        sh '''curl http://localhost:8088
'''
      }
    }
  }
}