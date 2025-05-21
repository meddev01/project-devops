provider "aws" {
  region = "eu-west-1"  
}

# --- VM 1 : Jenkins ---
resource "aws_instance" "jenkins" {
  ami           = "ami-0c02fb55956c7d316"   
  instance_type = "t2.medium"
  key_name      = "my-ssh-key"              
  tags = {
    Name = "jenkins-vm"
    Role = "CI/CD"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt update",
      "sudo apt install -y openjdk-11-jdk",
      "curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee \
        /usr/share/keyrings/jenkins-keyring.asc > /dev/null",
      "echo 'deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/' | sudo tee \
        /etc/apt/sources.list.d/jenkins.list > /dev/null",
      "sudo apt update && sudo apt install -y jenkins",
      "sudo systemctl enable jenkins && sudo systemctl start jenkins"
    ]
  }

  connection {
    type        = "ssh"
    user        = "ubuntu"
    private_key = file("~/.ssh/id_rsa")
    host        = self.public_ip
  }
}

# --- VM 2 : Kubernetes (Minikube) ---
resource "aws_instance" "k8s" {
  ami           = "ami-0c02fb55956c7d316"  
  instance_type = "t2.medium"
  key_name      = "my-ssh-key"
  tags = {
    Name = "k8s-vm"
    Role = "Cluster"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt update",
      "sudo apt install -y docker.io curl conntrack",
      "curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64",
      "sudo install minikube-linux-amd64 /usr/local/bin/minikube",
      "curl -LO https://dl.k8s.io/release/v1.28.2/bin/linux/amd64/kubectl",
      "sudo install kubectl /usr/local/bin/kubectl",
      "minikube start --driver=docker"
    ]
  }

  connection {
    type        = "ssh"
    user        = "ubuntu"
    private_key = file("~/.ssh/id_rsa")
    host        = self.public_ip
  }
}
