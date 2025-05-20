#!/bin/bash

# Stop on error
set -e

# Variables
IMAGE_NAME="meddev01/project-devops:latest"
K8S_DIR="k8s/"

echo "➡️  [1/5] Build TypeScript"
npm run build

echo "🐳 [2/5] Build Docker image"
docker build -t $IMAGE_NAME .

echo "📤 [3/5] Push image to DockerHub"
docker push $IMAGE_NAME

echo "☸️  [4/5] Apply Kubernetes resources"
kubectl apply -f ${K8S_DIR}project-secrets.yaml
kubectl apply -f ${K8S_DIR}postgres-pvc.yaml
kubectl apply -f ${K8S_DIR}postgres-deployment.yaml
kubectl apply -f ${K8S_DIR}postgres-service.yaml
kubectl apply -f ${K8S_DIR}project-devops-deployment.yaml
kubectl apply -f ${K8S_DIR}project-devops-service.yaml

echo "✅ [5/5] DONE - Project deployed!"
