# 🛠 Provisionnement de l'infrastructure avec Terraform

Ce dossier contient un fichier `main.tf` **théorique** qui décrit le provisionnement d'une infrastructure complète DevOps via **Terraform**.

---

## 🎯 Objectif de l'infrastructure

Provisionner deux machines virtuelles (VMs) sur AWS :

- **VM 1 - Jenkins** :

  - Sert de serveur CI/CD
  - Jenkins est installé automatiquement à l'aide du bloc `remote-exec`
  - Lancement du service Jenkins après installation

- **VM 2 - Kubernetes (Minikube)** :
  - Sert de cluster K8s local pour le déploiement de l’application
  - Installe Docker, Minikube et kubectl
  - Lance le cluster Minikube dans la VM

---

## ⚙️ Technologies utilisées

- [Terraform](https://www.terraform.io/) : Provisionnement Infrastructure as Code
- [AWS EC2](https://aws.amazon.com/ec2/) : Fournisseur cloud cible
- Ubuntu Server 22.04 : OS choisi pour les deux VMs

---

## 🔒 Sécurité

- La connexion SSH aux instances se fait via une clé privée (`~/.ssh/id_rsa`)
- Les VM sont taggées avec des rôles pour une organisation claire (`CI/CD`, `Cluster`)

---

## ⚠️ Important

Ce fichier est **théorique**, utilisé pour illustrer la capacité à décrire une infrastructure complète avec Terraform.  
Il **n’est pas exécuté dans ce projet**, car le déploiement a été fait localement via Minikube.

---

## 📂 Structure

infra/
└── terraform/
├── main.tf # Fichier principal Terraform
└── README.md # Explication de l'objectif du fichier
