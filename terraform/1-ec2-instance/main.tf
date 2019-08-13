resource "aws_instance" "listsapiprod" {
    ami = "${data.aws_ami.ubuntu.id}"
    instance_type = "t2.micro"
    key_name = "${aws_key_pair.lists-key.key_name}"

    security_groups = [
        "${aws_security_group.allow_ssh.name}",
        "${aws_security_group.allow_http.name}",
        "${aws_security_group.allow_outbound.name}",
    ]

    connection {
        type = "ssh"
        host = "${aws_instance.listsapiprod.public_ip}"
        # host = "self.public_ip"
        user = "ubuntu"
        private_key = "${file("~/.ssh/terraform_rsa")}"
    }
    provisioner "remote-exec" {
        inline = [
            "yes | sudo apt update",
            "yes | sudo apt upgrade",
            "curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -",
            "sudo apt-get install -y nodejs",
            "node --version",
            "sudo chown -R ubuntu:ubuntu /usr/lib/node_modules",
            "sudo chmod 0775 /usr/bin/",
            "sudo chown root:ubuntu /usr/bin/",
            "npm i -g pm2",
            "yes | sudo apt install nginx",
            # "sudo chkconfig nginx on",
            "sudo mkdir -p /var/apps/lists",
            "sudo chown -R ubuntu:ubuntu /var/apps/",
        ]
    }

    provisioner "file" {
        source = "files/lists"
        destination = "/tmp/lists"
    }

    provisioner "remote-exec" {
        inline = [
            "sudo mv /tmp/lists /etc/nginx/sites-available/lists",
            "sudo ln -s /etc/nginx/sites-available/lists /etc/nginx/sites-enabled/.",
            "sudo service nginx restart"
        ]
    }

    tags = {
        Name = "lists"
    }
}

