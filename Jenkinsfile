pipeline {
  agent any

  environment {
    DOCKERHUB_USER = 'your-dockerhub-username'
    IMAGE_NAME = 'project-devops'
    TAG = 'latest'
  }

  stages {

    stage('Checkout') {
      steps {
        git 'https://github.com/ton-repo/project-devops.git' 
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
        sh 'docker build -t $DOCKERHUB_USER/$IMAGE_NAME:$TAG .'
      }
    }

    stage('Docker Login') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
        }
      }
    }

    stage('Docker Push') {
      steps {
        sh 'docker push $DOCKERHUB_USER/$IMAGE_NAME:$TAG'
      }
    }

    stage('Kubernetes Deploy') {
      steps {
        sh 'kubectl apply -f k8s/namespace.yaml'
        sh 'kubectl apply -f k8s/deployment.yaml'
        sh 'kubectl apply -f k8s/service.yaml'
      }
    }
  }
}
