# 🚀 PROJECT-DEVOPS

Application TODO API développée en Node.js + TypeScript avec une architecture DevOps complète et déployée dans un cluster Kubernetes (Minikube).

---

## Technologies

- **Backend** : Node.js, TypeScript, Express.js
- **Base de données** : PostgreSQL
- **Gestion des secrets** : Kubernetes Secrets
- **Containerisation** : Docker
- **Orchestration** : Kubernetes via Minikube
- **CI/CD** : Jenkins + DockerHub
- **Automatisation** : Script `deploy.sh`

---

## Fonctionnalités de l'API

- CRUD complet sur les tâches (todos)
- Architecture modulaire `controller`, `service`, `routes`, `middleware`
- Validation des données
- Gestion des erreurs centralisée
- Sécurité des credentials via Secrets Kubernetes

---

## Lancement local avec Docker Compose

```bash
git clone https://github.com/meddev01/project-devops.git
cd project-devops
docker-compose up --build
```
