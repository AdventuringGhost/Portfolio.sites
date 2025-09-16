# Enterprise Network Topology - Detailed Design

## Network Overview
This enterprise network implements a three-tier architecture with security zones, DMZ, and redundant connections.

## Device Inventory

### Core Layer
- **2x Cisco 3750-24PS Switches** (Core-1, Core-2)
- **1x Cisco 3945 Router** (Core-Router)

### Distribution Layer
- **2x Cisco 3750-24PS Switches** (Dist-1, Dist-2)
- **1x Cisco ASA 5510 Firewall** (ASA-Firewall)

### Access Layer
- **4x Cisco 2960-24TT Switches** (Access-1 to Access-4)

### DMZ Components
- **1x Cisco 2960-24TT Switch** (DMZ-Switch)
- **1x Generic Server** (Web-Server)
- **1x Generic Server** (Mail-Server)
- **1x Generic Server** (DNS-Server)

### Internal Servers
- **1x Generic Server** (File-Server)
- **1x Generic Server** (Database-Server)
- **1x Generic Server** (Application-Server)
- **1x Generic Server** (DHCP-Server)

### End Devices
- **8x PCs** (Internal Workstations)
- **2x Laptops** (Guest Network)
- **1x Printer** (Network Printer)

### Internet Simulation
- **1x Cloud Device** (Internet-Cloud)
- **1x Generic Server** (External-Web)

## Physical Connections

### Core Layer Connections
```
Core-1 ←→ Core-2 (GigabitEthernet 1/0/1)
Core-1 ←→ Dist-1 (GigabitEthernet 1/0/2)
Core-1 ←→ Dist-2 (GigabitEthernet 1/0/3)
Core-2 ←→ Dist-1 (GigabitEthernet 1/0/2)
Core-2 ←→ Dist-2 (GigabitEthernet 1/0/3)
Core-Router ←→ Core-1 (GigabitEthernet 0/0)
Core-Router ←→ Core-2 (GigabitEthernet 0/1)
```

### Distribution Layer Connections
```
Dist-1 ←→ Access-1 (GigabitEthernet 1/0/1)
Dist-1 ←→ Access-2 (GigabitEthernet 1/0/2)
Dist-2 ←→ Access-3 (GigabitEthernet 1/0/1)
Dist-2 ←→ Access-4 (GigabitEthernet 1/0/2)
ASA-Firewall ←→ Dist-1 (GigabitEthernet 0/0)
ASA-Firewall ←→ Dist-2 (GigabitEthernet 0/1)
```

### DMZ Connections
```
ASA-Firewall ←→ DMZ-Switch (GigabitEthernet 0/2)
DMZ-Switch ←→ Web-Server (FastEthernet 0/1)
DMZ-Switch ←→ Mail-Server (FastEthernet 0/2)
DMZ-Switch ←→ DNS-Server (FastEthernet 0/3)
```

### Internet Connections
```
ASA-Firewall ←→ Internet-Cloud (GigabitEthernet 0/3)
Internet-Cloud ←→ External-Web (FastEthernet 0/1)
Core-Router ←→ Internet-Cloud (GigabitEthernet 0/2)
```

### Access Layer Connections
```
Access-1 ←→ PC1 (FastEthernet 0/1)
Access-1 ←→ PC2 (FastEthernet 0/2)
Access-1 ←→ PC3 (FastEthernet 0/3)
Access-1 ←→ PC4 (FastEthernet 0/4)

Access-2 ←→ PC5 (FastEthernet 0/1)
Access-2 ←→ PC6 (FastEthernet 0/2)
Access-2 ←→ PC7 (FastEthernet 0/3)
Access-2 ←→ PC8 (FastEthernet 0/4)

Access-3 ←→ Laptop1 (FastEthernet 0/1)
Access-3 ←→ Laptop2 (FastEthernet 0/2)

Access-4 ←→ Printer (FastEthernet 0/1)
```

### Internal Server Connections
```
Dist-1 ←→ File-Server (GigabitEthernet 1/0/3)
Dist-1 ←→ Database-Server (GigabitEthernet 1/0/4)
Dist-2 ←→ Application-Server (GigabitEthernet 1/0/3)
Dist-2 ←→ DHCP-Server (GigabitEthernet 1/0/4)
```

## Security Zones and VLANs

### Security Zones
1. **Internal Network** (Trusted)
   - VLAN 10: Management (192.168.10.0/24)
   - VLAN 20: Workstations (192.168.20.0/24)
   - VLAN 30: Servers (192.168.30.0/24)
   - VLAN 40: Guest (192.168.40.0/24)

2. **DMZ** (Semi-trusted)
   - VLAN 50: DMZ Servers (192.168.50.0/24)

3. **External Network** (Untrusted)
   - Internet simulation

### VLAN Assignments
- **VLAN 10**: Management interfaces, switch management
- **VLAN 20**: Internal workstations (PC1-PC8)
- **VLAN 30**: Internal servers (File, Database, Application, DHCP)
- **VLAN 40**: Guest network (Laptop1, Laptop2)
- **VLAN 50**: DMZ servers (Web, Mail, DNS)

## IP Addressing Scheme

### Management Network (VLAN 10)
- Core-1: 192.168.10.1
- Core-2: 192.168.10.2
- Dist-1: 192.168.10.11
- Dist-2: 192.168.10.12
- Access-1: 192.168.10.21
- Access-2: 192.168.10.22
- Access-3: 192.168.10.23
- Access-4: 192.168.10.24
- DMZ-Switch: 192.168.10.31

### Workstation Network (VLAN 20)
- Gateway: 192.168.20.1
- PC1: 192.168.20.10
- PC2: 192.168.20.11
- PC3: 192.168.20.12
- PC4: 192.168.20.13
- PC5: 192.168.20.14
- PC6: 192.168.20.15
- PC7: 192.168.20.16
- PC8: 192.168.20.17

### Internal Server Network (VLAN 30)
- Gateway: 192.168.30.1
- File-Server: 192.168.30.10
- Database-Server: 192.168.30.11
- Application-Server: 192.168.30.12
- DHCP-Server: 192.168.30.13

### Guest Network (VLAN 40)
- Gateway: 192.168.40.1
- Laptop1: 192.168.40.10
- Laptop2: 192.168.40.11

### DMZ Network (VLAN 50)
- Gateway: 192.168.50.1
- Web-Server: 192.168.50.10
- Mail-Server: 192.168.50.11
- DNS-Server: 192.168.50.12

### External Network
- Internet-Cloud: 203.0.113.1
- External-Web: 203.0.113.10

## Security Configuration

### Firewall Rules (ASA 5510)
- **Inside to DMZ**: Allow HTTP, HTTPS, SMTP
- **Inside to Outside**: Allow HTTP, HTTPS, DNS
- **DMZ to Inside**: Deny all (except responses)
- **DMZ to Outside**: Allow HTTP, HTTPS, SMTP, DNS
- **Outside to DMZ**: Allow HTTP, HTTPS, SMTP, DNS
- **Outside to Inside**: Deny all

### Access Control Lists
- **VLAN 20 to VLAN 30**: Allow specific services
- **VLAN 40**: Limited internet access only
- **Management VLAN**: Restricted access

## Step-by-Step Packet Tracer Build Instructions

1. **Add Core Devices**
   - Place 2x 3750-24PS switches in center
   - Place 1x 3945 router below switches

2. **Add Distribution Layer**
   - Place 2x 3750-24PS switches below core
   - Place 1x ASA 5510 firewall to the right

3. **Add Access Layer**
   - Place 4x 2960-24TT switches below distribution

4. **Add DMZ Components**
   - Place 1x 2960-24TT switch to the right of firewall
   - Place 3x Generic Servers near DMZ switch

5. **Add Internal Servers**
   - Place 4x Generic Servers near distribution switches

6. **Add End Devices**
   - Place 8x PCs near access switches
   - Place 2x Laptops near Access-3
   - Place 1x Printer near Access-4

7. **Add Internet Simulation**
   - Place 1x Cloud device to the right
   - Place 1x Generic Server near cloud

8. **Make Physical Connections**
   - Use appropriate cables for each connection type
   - Follow the connection diagram above

9. **Configure Security and Routing**
   - Configure VLANs and IP addresses
   - Set up firewall rules
   - Configure routing protocols
