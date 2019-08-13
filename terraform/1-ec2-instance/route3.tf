# resource "aws_route53_zone" "primary" {
#     name = "expertbasics.com"
# }
resource "aws_route53_record" "prod" {
#   zone_id = "${aws_route53_zone.primary.zone_id}"
  zone_id = "Z1F14MOS8CUFQX"
  name    = "api.lists.expertbasics.com"
  type    = "A"
  ttl     = "60"
#   records = ["${aws_instance.listsapiprod.public_ip}"]
  records = ["${aws_eip.listsapiprod-eip.public_ip}"]
                
}
