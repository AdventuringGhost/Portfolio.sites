# Outputs for Portfolio VPC Configuration

output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "vpc_cidr_block" {
  description = "CIDR block of the VPC"
  value       = aws_vpc.main.cidr_block
}

output "public_subnet_ids" {
  description = "IDs of the public subnets"
  value       = [aws_subnet.public_1.id, aws_subnet.public_2.id]
}

output "public_subnet_cidrs" {
  description = "CIDR blocks of the public subnets"
  value       = [aws_subnet.public_1.cidr_block, aws_subnet.public_2.cidr_block]
}

output "internet_gateway_id" {
  description = "ID of the Internet Gateway"
  value       = aws_internet_gateway.main.id
}

output "web_security_group_id" {
  description = "ID of the web security group"
  value       = aws_security_group.web.id
}

output "public_route_table_id" {
  description = "ID of the public route table"
  value       = aws_route_table.public.id
}

output "availability_zones" {
  description = "Availability zones used"
  value       = [aws_subnet.public_1.availability_zone, aws_subnet.public_2.availability_zone]
}


