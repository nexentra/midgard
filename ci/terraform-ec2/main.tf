provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "midgard" {
  name_prefix = "midgard"

 ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8081
    to_port     = 8081
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8079
    to_port     = 8079
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "midgard" {
  ami           = "ami-006dcf34c09e50022"
  instance_type = "t2.micro"
  key_name      = "midgard"
  vpc_security_group_ids = [
    aws_security_group.midgard.id,
  ]
  root_block_device {
    volume_size = 30
  }
  provisioner "file" {
    source      = "../../${path.module}/.env"
    destination = "/home/ec2-user/.env"

    connection {
      type        = "ssh"
      user        = "ec2-user"
      private_key = file("../../midgard.pem")
      host        = self.public_dns
    }
  }

  provisioner "file" {
    source      = "../../${path.module}/client/.env.local"
    destination = "/home/ec2-user/.env.local"

    connection {
      type        = "ssh"
      user        = "ec2-user"
      private_key = file("../../midgard.pem")
      host        = self.public_dns
    }
  }

  # user_data = <<-EOF
  #             #!/bin/bash -xe
  #             EOF

  provisioner "remote-exec" {
    inline = [
      "sudo yum install -y git",
      "sudo yum install -y docker",
      "sudo systemctl enable docker",
      "sudo systemctl start docker",
      "sudo chown $USER /var/run/docker.sock",
      "cd /home/ec2-user/ && git clone https://github.com/nexentra/midgard.git",
      "mv /home/ec2-user/.env /home/ec2-user/midgard/.env && mv /home/ec2-user/.env.local /home/ec2-user/midgard/client/.env.local",
      "cd /home/ec2-user/midgard && sudo make docker-run"
    ]

    connection {
      type        = "ssh"
      user        = "ec2-user"
      private_key = file("../../midgard.pem")
      host        = self.public_dns
    }
  }
}

// if you would like to add ebs volume to the ec2 instance
# resource "aws_ebs_volume" "midgard" {
#   availability_zone = aws_instance.midgard.availability_zone
#   size              = 20
#   tags = {
#     Name = "ebs_volume"
#   }
# }

# resource "aws_volume_attachment" "midgard" {
#   device_name = "/dev/sdh"
#   volume_id   = aws_ebs_volume.midgard.id
#   instance_id = aws_instance.midgard.id
# }

# output "volume_id" {
#   value = aws_ebs_volume.midgard.id
# }

# output "attachment_id" {
#   value = aws_volume_attachment.midgard.id
# }

output "public_ip" {
  value = aws_instance.midgard.public_ip
}




