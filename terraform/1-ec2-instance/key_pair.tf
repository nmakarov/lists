resource "aws_key_pair" "lists-key" {
    key_name = "lists-key"
    public_key = "${file("terraform_rsa.pub")}"
}