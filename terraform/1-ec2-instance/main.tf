resource "aws_instance" "listsapiprod" {
    ami = "${data.aws_ami.ubuntu.id}"
    instance_type = "t2.micro"
    key_name = "${aws_key_pair.lists-key.key_name}"

    security_groups = [
        "${aws_security_group.allow_ssh.name}",
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
        ]
    }

    tags = {
        Name = "lists"
    }
}