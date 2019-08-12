output "server-ip" {
    value = "${aws_eip.listsapiprod-eip.public_ip}"
}
