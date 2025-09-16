# Security Labs - Packet Tracer Labs

This directory contains Packet Tracer security lab files. These labs focus on network security implementation and best practices.

## Lab Files to Create

### 1. firewall-configuration.pkt
**Objective**: Configure and test firewall rules
**Components**:
- Cisco ASA or Router with ACLs
- Internal network (192.168.1.0/24)
- DMZ network (192.168.2.0/24)
- External network (simulated internet)
- Web server in DMZ
- Internal workstations

**Security Features to Implement**:
- Stateful firewall rules
- NAT/PAT configuration
- Access Control Lists (ACLs)
- Port security
- DHCP snooping

### 2. vpn-setup.pkt
**Objective**: Configure site-to-site VPN
**Components**:
- Two routers with VPN capabilities
- Simulated internet connection
- Local networks at each site
- VPN tunnel configuration

### 3. access-control.pkt
**Objective**: Implement network access control
**Components**:
- 802.1X authentication server
- Switches with 802.1X support
- Workstations with supplicant software
- Guest network isolation

## Security Best Practices Demonstrated

- Defense in depth
- Principle of least privilege
- Network segmentation
- Monitoring and logging
- Incident response procedures

## How to Create These Files

1. Open Cisco Packet Tracer
2. Create a new project
3. Add the required security devices
4. Configure security policies and rules
5. Test security implementations
6. Save the file in this directory

## Configuration Templates

See the `../scripts/config-templates/` directory for security configuration templates.
