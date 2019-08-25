resource "aws_vpc" "vpc" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "${var.name_tag}"
  }
}

resource "aws_internet_gateway" "gateway" {
  vpc_id = "${aws_vpc.vpc.id}"

  tags = {
    Name = "${var.name_tag}"
  }
}

resource "aws_route" "route" {
  route_table_id         = "${aws_vpc.vpc.main_route_table_id}"
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = "${aws_internet_gateway.gateway.id}"
}

# resource "aws_subnet" "main" {
# #   count                   = "${length(data.aws_availability_zones.available.names)}"
#   vpc_id                  = "${aws_vpc.vpc.id}"
# #   cidr_block              = "10.0.${count.index}.0/24"
#     cidr_block = "10.0.1.0/24"
#   map_public_ip_on_launch = true
# #   availability_zone       = "${element(data.aws_availability_zones.available.names, count.index)}"
#     availability_zone = "us-west-2a"
#   tags = {
#     Name = "${var.name_tag}"
#   }
# }

resource "aws_subnet" "subnet1" {
    vpc_id = "${aws_vpc.vpc.id}"
    cidr_block = "10.0.1.0/24"
    map_public_ip_on_launch = true
    availability_zone = "us-west-2a"
    tags = {
        Name = "${var.name_tag}"
    }
}

resource "aws_subnet" "subnet2" {
    vpc_id = "${aws_vpc.vpc.id}"
    cidr_block = "10.0.2.0/24"
    map_public_ip_on_launch = true
    availability_zone = "us-west-2b"
    tags = {
        Name = "${var.name_tag}"
    }
}

resource "aws_security_group" "default" {
  name        = "terraform_security_group"
  description = "Terraform example security group"
  vpc_id      = "${aws_vpc.vpc.id}"

  # Allow outbound internet access.
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.name_tag}"
  }
}

data "aws_availability_zones" "available" {}


