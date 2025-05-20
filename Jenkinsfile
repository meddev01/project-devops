pipeline {
  agent any

  environment {
    DOCKER_IMAGE = 'meddev01/project-devops:latest'
    DOCKER_CREDENTIALS_ID = 'dockerhub-creds'
    KUBECONFIG_CREDENTIALS_ID = 'kubeconfig-creds'
  }

  stages {

    stage('Checkout') {
      steps {
        git 'https://github.com/meddev01/project-devops.git' // à adapter
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build TypeScript') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Docker Build') {
      steps {
        sh "docker build -t $DOCKER_IMAGE ."
      }
    }

    stage('Docker Login & Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: "$DOCKER_CREDENTIALS_ID", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
          sh "docker push $DOCKER_IMAGE"
        }
      }
    }

    stage('Deploy to K8s') {
      steps {
        withCredentials([file(credentialsId: "$KUBECONFIG_CREDENTIALS_ID", variable: 'KUBECONFIG_FILE')]) {
          sh '''
            export KUBECONFIG=$KUBECONFIG_FILE
            kubectl apply -f k8s/namespace.yaml
            kubectl apply -f k8s/postgres-pvc.yaml
            kubectl apply -f k8s/postgres-deployment.yaml
            kubectl apply -f k8s/postgres-service.yaml
            kubectl apply -f k8s/project-devops-deployment.yaml
            kubectl apply -f k8s/project-devops-service.yaml
          '''
        }
      }
    }
  }
}
