# Network Designs - Packet Tracer Labs

This directory contains Packet Tracer network design files. Since Packet Tracer files (.pkt) are binary files that need to be created within the Packet Tracer application, this directory serves as a placeholder and documentation for the network designs.

## Lab Files to Create

### 1. campus-network.pkt
**Objective**: Design a campus network with multiple buildings
**Components**:
- Core switches (2 for redundancy)
- Distribution switches per building
- Access switches for end devices
- Router for internet connectivity
- DHCP server
- DNS server

**VLANs**:
- VLAN 10: Management (192.168.10.0/24)
- VLAN 20: Faculty (192.168.20.0/24)
- VLAN 30: Students (192.168.30.0/24)
- VLAN 40: Guest (192.168.40.0/24)
- VLAN 50: Servers (192.168.50.0/24)

### 2. enterprise-network.pkt
**Objective**: Design an enterprise network with security zones
**Components**:
- Core layer switches
- Distribution layer switches
- Access layer switches
- Firewall (ASA or router with ACLs)
- DMZ servers
- Internal servers
- Workstations

**Security Zones**:
- Internal Network
- DMZ
- Guest Network
- Management Network

## How to Create These Files

1. Open Cisco Packet Tracer
2. Create a new project
3. Add the required devices according to the specifications above
4. Configure VLANs, IP addresses, and routing
5. Save the file in this directory with the specified name

## Configuration Templates

See the `../scripts/config-templates/` directory for Cisco IOS configuration templates that can be used in these labs.
