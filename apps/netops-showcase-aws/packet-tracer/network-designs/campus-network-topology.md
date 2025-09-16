# Campus Network Topology - Detailed Design

## Network Overview
This campus network connects multiple buildings with redundant links and proper VLAN segmentation.

## Device Inventory

### Core Layer (Building A - Main Data Center)
- **2x Cisco 2960-24TT Switches** (Core-1, Core-2)
- **1x Cisco 1941 Router** (Core-Router)
- **1x Cisco 2811 Router** (Internet-Gateway)

### Distribution Layer (Each Building)
- **Building A**: 2x Cisco 2960-24TT (Dist-A1, Dist-A2)
- **Building B**: 2x Cisco 2960-24TT (Dist-B1, Dist-B2)
- **Building C**: 2x Cisco 2960-24TT (Dist-C1, Dist-C2)

### Access Layer (Each Building)
- **Building A**: 4x Cisco 2960-24TT (Access-A1 to Access-A4)
- **Building B**: 3x Cisco 2960-24TT (Access-B1 to Access-B3)
- **Building C**: 3x Cisco 2960-24TT (Access-C1 to Access-C3)

### Servers and Services
- **1x Generic Server** (DHCP-Server) - VLAN 50
- **1x Generic Server** (DNS-Server) - VLAN 50
- **1x Generic Server** (Web-Server) - VLAN 50
- **1x Generic Server** (File-Server) - VLAN 50

### End Devices
- **Building A**: 8x PCs (Faculty), 8x PCs (Students)
- **Building B**: 6x PCs (Faculty), 6x PCs (Students)
- **Building C**: 6x PCs (Faculty), 6x PCs (Students)
- **Guest Network**: 3x Laptops (one per building)

## Physical Connections

### Core Layer Connections
```
Core-1 ←→ Core-2 (GigabitEthernet 0/1)
Core-1 ←→ Dist-A1 (GigabitEthernet 0/2)
Core-1 ←→ Dist-A2 (GigabitEthernet 0/3)
Core-2 ←→ Dist-A1 (GigabitEthernet 0/2)
Core-2 ←→ Dist-A2 (GigabitEthernet 0/3)
Core-Router ←→ Core-1 (GigabitEthernet 0/1)
Core-Router ←→ Core-2 (GigabitEthernet 0/2)
Internet-Gateway ←→ Core-Router (GigabitEthernet 0/0)
```

### Inter-Building Connections
```
Core-1 ←→ Dist-B1 (GigabitEthernet 0/4)
Core-1 ←→ Dist-B2 (GigabitEthernet 0/5)
Core-2 ←→ Dist-B1 (GigabitEthernet 0/4)
Core-2 ←→ Dist-B2 (GigabitEthernet 0/5)

Core-1 ←→ Dist-C1 (GigabitEthernet 0/6)
Core-1 ←→ Dist-C2 (GigabitEthernet 0/7)
Core-2 ←→ Dist-C1 (GigabitEthernet 0/6)
Core-2 ←→ Dist-C2 (GigabitEthernet 0/7)
```

### Distribution to Access Layer (Building A)
```
Dist-A1 ←→ Access-A1 (FastEthernet 0/1)
Dist-A1 ←→ Access-A2 (FastEthernet 0/2)
Dist-A2 ←→ Access-A3 (FastEthernet 0/1)
Dist-A2 ←→ Access-A4 (FastEthernet 0/2)
```

### Distribution to Access Layer (Building B)
```
Dist-B1 ←→ Access-B1 (FastEthernet 0/1)
Dist-B1 ←→ Access-B2 (FastEthernet 0/2)
Dist-B2 ←→ Access-B3 (FastEthernet 0/1)
```

### Distribution to Access Layer (Building C)
```
Dist-C1 ←→ Access-C1 (FastEthernet 0/1)
Dist-C1 ←→ Access-C2 (FastEthernet 0/2)
Dist-C2 ←→ Access-C3 (FastEthernet 0/1)
```

### Server Connections
```
Core-1 ←→ DHCP-Server (FastEthernet 0/8)
Core-1 ←→ DNS-Server (FastEthernet 0/9)
Core-1 ←→ Web-Server (FastEthernet 0/10)
Core-1 ←→ File-Server (FastEthernet 0/11)
```

## VLAN Configuration

### VLAN Assignments
- **VLAN 10**: Management (192.168.10.0/24)
- **VLAN 20**: Faculty (192.168.20.0/24)
- **VLAN 30**: Students (192.168.30.0/24)
- **VLAN 40**: Guest (192.168.40.0/24)
- **VLAN 50**: Servers (192.168.50.0/24)

### Port Assignments
- **Faculty PCs**: Access to VLAN 20
- **Student PCs**: Access to VLAN 30
- **Guest Laptops**: Access to VLAN 40
- **Servers**: Access to VLAN 50
- **Management**: All switch management interfaces on VLAN 10

## IP Addressing Scheme

### Management Network (VLAN 10)
- Core-1: 192.168.10.1
- Core-2: 192.168.10.2
- Dist-A1: 192.168.10.11
- Dist-A2: 192.168.10.12
- Dist-B1: 192.168.10.21
- Dist-B2: 192.168.10.22
- Dist-C1: 192.168.10.31
- Dist-C2: 192.168.10.32
- Access switches: 192.168.10.41-49

### Faculty Network (VLAN 20)
- Gateway: 192.168.20.1
- Range: 192.168.20.10-192.168.20.50

### Student Network (VLAN 30)
- Gateway: 192.168.30.1
- Range: 192.168.30.10-192.168.30.100

### Guest Network (VLAN 40)
- Gateway: 192.168.40.1
- Range: 192.168.40.10-192.168.40.30

### Server Network (VLAN 50)
- DHCP Server: 192.168.50.10
- DNS Server: 192.168.50.11
- Web Server: 192.168.50.12
- File Server: 192.168.50.13
- Gateway: 192.168.50.1

## Step-by-Step Packet Tracer Build Instructions

1. **Add Core Devices**
   - Place 2x 2960-24TT switches in center
   - Place 1x 1941 router below switches
   - Place 1x 2811 router for internet

2. **Add Distribution Switches**
   - Place 2x 2960-24TT for each building (6 total)
   - Position them in a triangle around core

3. **Add Access Switches**
   - Place 4x 2960-24TT for Building A
   - Place 3x 2960-24TT for Building B
   - Place 3x 2960-24TT for Building C

4. **Add Servers**
   - Place 4x Generic Servers near core switches

5. **Add End Devices**
   - Place PCs and laptops near access switches

6. **Make Physical Connections**
   - Use copper straight-through cables for all connections
   - Follow the connection diagram above

7. **Configure VLANs and IP addresses**
   - Use the configuration scripts provided
