# Terraform Infrastructure

This directory contains Terraform configurations for infrastructure as code.

## VPC Configuration

This Terraform configuration creates a minimal AWS VPC setup with:

- **VPC**: 10.0.0.0/16 CIDR block with DNS support
- **Public Subnets**: 2 subnets across different AZs (10.0.1.0/24, 10.0.2.0/24)
- **Internet Gateway**: For public internet access
- **Route Tables**: Proper routing for public subnets
- **Security Group**: Web traffic (HTTP/HTTPS) security group

## Usage

### Prerequisites

1. AWS CLI configured with appropriate credentials
2. Terraform installed (>= 1.0)

### Commands

```bash
# Initialize Terraform
terraform init

# Plan the infrastructure
terraform plan

# Apply the infrastructure
terraform apply

# Destroy the infrastructure
terraform destroy
```

### Variables

You can customize the deployment using variables:

```bash
# Deploy to different region
terraform apply -var="aws_region=us-west-2"

# Deploy to different environment
terraform apply -var="environment=staging"
```

### Outputs

After deployment, Terraform will output:
- VPC ID
- Subnet IDs
- Security Group ID
- Internet Gateway ID

## Architecture

```
Internet Gateway
       |
   VPC (10.0.0.0/16)
       |
   +---+---+
   |       |
Public Subnet 1    Public Subnet 2
(10.0.1.0/24)     (10.0.2.0/24)
   AZ-1              AZ-2
```

## Security

- Public subnets have internet access via Internet Gateway
- Security group allows HTTP (80) and HTTPS (443) traffic
- All outbound traffic is allowed (can be restricted as needed)

## Cost

This configuration uses minimal resources:
- VPC (free)
- Internet Gateway (free)
- Subnets (free)
- Security Groups (free)

Only pay for resources deployed within the VPC (EC2, RDS, etc.)
