# terraform apply -var-file="user.tfvars" -auto-approve



data "aws_ami" "ubuntu" {
    most_recent = true
    filter {
        name = "name"
        values = ["ubuntu/images/hvm-ssd/ubuntu-bionic-18.04-amd64-server-*"]
    }

    filter {
        name = "virtualization-type"
        values = ["hvm"]
    }

    owners = ["099720109477"]
}

resource "aws_key_pair" "tf_key" {
    key_name = "tf_key"
    public_key = "${file("terraform_rsa.pub")}"
}

resource "aws_vpc" "tf_vpc" {
    cidr_block = "10.0.0.0/16"
    enable_dns_hostnames = true
    enable_dns_support = true
    tags = {
        Name = "${var.name_tag}"
    }
}

resource "aws_subnet" "subnet_1" {
    cidr_block = "10.0.1.0/24"
    # cidr_block = "${cidrsubnet(aws_vpc.tf_vpc.cidr_block, 3, 1)}"
    vpc_id = "${aws_vpc.tf_vpc.id}"
    availability_zone = "us-west-2a"
}

resource "aws_subnet" "subnet_2" {
    cidr_block = "10.0.2.0/24"
    # cidr_block = "${cidrsubnet(aws_vpc.tf_vpc.cidr_block, 3, 1)}"
    vpc_id = "${aws_vpc.tf_vpc.id}"
    availability_zone = "us-west-2b"
}

resource "aws_eip" "tf_eip_ec2" {
    instance = "${aws_instance.tf_ec2.id}"
    vpc      = true
}

# resource "aws_eip" "tf_eip_rds" {
#     instance = "${aws_db_instance.tf_rds.id}"
#     vpc      = true
# }

resource "aws_internet_gateway" "tf_ig" {
    vpc_id = "${aws_vpc.tf_vpc.id}"
    tags = {
        Name = "${var.name_tag}"
    }
}

resource "aws_route_table" "tf_rt" {
    vpc_id = "${aws_vpc.tf_vpc.id}"
    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = "${aws_internet_gateway.tf_ig.id}"
    }
    tags = {
        Name = "${var.name_tag}"
    }
}
resource "aws_route_table_association" "tf_rta" {
    subnet_id      = "${aws_subnet.subnet_1.id}"
    route_table_id = "${aws_route_table.tf_rt.id}"
}

resource "aws_instance" "tf_ec2" {
    ami = "${data.aws_ami.ubuntu.id}"
    instance_type = "t2.micro"
    key_name = "${aws_key_pair.tf_key.key_name}"
    subnet_id = "${aws_subnet.subnet_1.id}"
    vpc_security_group_ids = [
        "${aws_security_group.asg_ec2.id}"
    ]

    tags = {
        Name = "${var.name_tag}"
    }
}

resource "aws_db_subnet_group" "sg_rds" {
    name = "${var.rds_instance_identifier}-subnet-group"
    subnet_ids  = [
        "${aws_subnet.subnet_1.id}",
        "${aws_subnet.subnet_2.id}"
    ]
}

resource "aws_db_instance" "tf_rds" {
    identifier                = "${var.rds_instance_identifier}"
    allocated_storage         = 20
    engine                    = "postgres"
    engine_version            = "11.2"
    instance_class            = "db.t2.micro"
    name                      = "${var.database_name}"
    username                  = "${var.database_user}"
    password                  = "${var.database_password}"
    db_subnet_group_name      = "${aws_db_subnet_group.sg_rds.id}"
    vpc_security_group_ids    = ["${aws_security_group.asg_postgres.id}"]
    skip_final_snapshot       = true
    final_snapshot_identifier = "Ignore"
}

