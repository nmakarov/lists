output "ec2_instance_id" {
  value = "${aws_instance.tf_ec2.id}"
}

output "tf_ec2_instance_address" {
  value = "${aws_eip.tf_eip_ec2.public_dns}"
}

output "rds_instance_address" {
  value = "${aws_db_instance.tf_rds.address}"
}

# output "tf_rds_instance_address" {
#   value = "${aws_eip.tf_eip_rds.public_dns}"
# }

