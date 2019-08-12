resource "aws_eip" "listsapiprod-eip" {
    instance = "${aws_instance.listsapiprod.id}"
}