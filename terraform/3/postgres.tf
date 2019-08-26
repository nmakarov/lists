resource "aws_subnet" "rds" {
  count                   = "${length(data.aws_availability_zones.available.names)}"
  vpc_id                  = "${aws_vpc.vpc.id}"
  cidr_block              = "10.0.${length(data.aws_availability_zones.available.names) + count.index}.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "${element(data.aws_availability_zones.available.names, count.index)}"
  tags = {
    Name = "${var.name_tag}"
  }
}

resource "aws_db_subnet_group" "default" {
  name        = "${var.rds_instance_identifier}-subnet-group"
#   subnet_ids  = ["${aws_subnet.rds.*.id}"]
    subnet_ids  = ["${aws_subnet.subnet1.id}", "${aws_subnet.subnet2.id}"]
}

resource "aws_security_group" "rds" {
  name        = "terraform_rds_security_group"
  vpc_id      = "${aws_vpc.vpc.id}"
  # Keep the instance private by only allowing traffic from the web server.
#   ingress {
#     from_port       = 3306
#     to_port         = 3306
#     protocol        = "tcp"
#     security_groups = ["${aws_security_group.default.id}"]
#   }

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
  }


  # Allow all outbound traffic.
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

resource "aws_db_instance" "default" {
  identifier                = "${var.rds_instance_identifier}"
  allocated_storage         = 20
  engine                    = "postgres"
  engine_version            = "11.2"
  instance_class            = "db.t2.micro"
  name                      = "${var.database_name}"
  username                  = "${var.database_user}"
  password                  = "${var.database_password}"
  db_subnet_group_name      = "${aws_db_subnet_group.default.id}"
  vpc_security_group_ids    = ["${aws_security_group.rds.id}"]
  skip_final_snapshot       = true
  final_snapshot_identifier = "Ignore"
}

# resource "aws_db_parameter_group" "default" {
#   name        = "${var.rds_instance_identifier}-param-group"
#   description = "Terraform example parameter group for postgresql"
#   family      = "postgresql.11.2"
#   parameter {
#     name  = "character_set_server"
#     value = "utf8"
#   }
#   parameter {
#     name  = "character_set_client"
#     value = "utf8"
#   }
# }
