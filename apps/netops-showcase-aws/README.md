# Campus Network – User-Friendly Project Timeline

> Project: **NetOps Campus Build**  
> Format: Visual timeline + plain-language summary  
> Purpose: Easy-to-read portfolio version for hiring managers

---

## 📅 Project Timeline (Start → Finish)

### 🟢 Phase 1 – Building the Foundation

* **What we did**: Set up Core, Distribution, and Access switches; added the Core Router.
* **Challenge**: Tried to configure router subinterfaces on a switch → got errors.
* **Fix**: Moved subinterface config to the Core Router (router-on-a-stick).

---

### 🟡 Phase 2 – VLANs + DHCP

* **What we did**: Created VLANs for Students, Faculty, Labs, Admins, Mgmt. Configured DHCP pools on the Core Router.
* **Challenge**: PCs weren't getting IPs.
* **Fix**: Realized PCs were still in VLAN 1. Configured access switchports to the right VLANs. DHCP leases started working (first in VLAN 10).

---

### 🔵 Phase 3 – NAT/PAT Setup

* **What we did**: Configured NAT overload so campus clients could reach the Internet.
* **Challenge**: NAT commands invalid on `fa0/0/0` (a switch module port).
* **Fix**: Re-cabled ISP link into a true routed interface (`g0/0`). NAT worked as expected.

---

### 🟣 Phase 4 – Adding ISP Router + Internet Server

* **What we did**: Added a dedicated ISP Router (WAN side /30 to Core, LAN side to 8.8.8.8 server).
* **Challenge**: Core ↔ ISP pings failed.
* **Fix**: Wrong cable/port used. Corrected cabling (Core g0/0 ↔ ISP g0/0). Assigned proper /30 IPs. Pings succeeded.

---

### 🔴 Phase 5 – Full Verification

* **What we tested**:
  * PCs pulled DHCP addresses.
  * Clients pinged their gateways.
  * Core Router ↔ ISP Router link stable.
  * NAT translations visible.
  * Student PC pinged 8.8.8.8 successfully.
  * HTTP from Student PC to 8.8.8.8 showed the default server page.

✅ End-to-end connectivity achieved (LAN ↔ Core ↔ ISP ↔ Internet Server).

---

## 🔧 Detailed Troubleshooting Log

### **Problem 1: Router Subinterface Configuration**
**Issue**: Attempted to configure router subinterfaces on a switch
```
Switch(config)# interface fa0/0.10
% Invalid input detected at '^' marker.
```
**Root Cause**: Switches don't support subinterface configuration
**Solution**: Moved subinterface config to Core Router
```
Core-Router(config)# interface fa0/0.10
Core-Router(config-subif)# encapsulation dot1Q 10
Core-Router(config-subif)# ip address 192.168.10.1 255.255.255.0
```

### **Problem 2: DHCP Lease Failures**
**Issue**: PCs not receiving IP addresses
```
PC> ipconfig
IP Address: 0.0.0.0
Subnet Mask: 0.0.0.0
Default Gateway: 0.0.0.0
```
**Root Cause**: PCs still assigned to VLAN 1, not configured VLANs
**Solution**: Configured access switchports to correct VLANs
```
Access-Switch(config)# interface fa0/1
Access-Switch(config-if)# switchport mode access
Access-Switch(config-if)# switchport access vlan 10
```

### **Problem 3: NAT Configuration Errors**
**Issue**: NAT commands invalid on switch module port
```
Core-Router(config)# interface fa0/0/0
Core-Router(config-if)# ip nat inside
% Invalid input detected at '^' marker.
```
**Root Cause**: fa0/0/0 is a switch module port, not a routed interface
**Solution**: Re-cabled ISP link to true routed interface
```
Core-Router(config)# interface g0/0
Core-Router(config-if)# ip nat outside
Core-Router(config-if)# ip address 203.0.113.2 255.255.255.252
```

### **Problem 4: Core-ISP Connectivity Failure**
**Issue**: Core Router cannot ping ISP Router
```
Core-Router# ping 203.0.113.1
Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to 203.0.113.1, timeout is 2 seconds:
.....
Success rate is 0 percent (0/5)
```
**Root Cause**: Wrong cable connection and IP subnet mismatch
**Solution**: Corrected cabling and IP configuration
```
Core-Router(config)# interface g0/0
Core-Router(config-if)# ip address 203.0.113.2 255.255.255.252
ISP-Router(config)# interface g0/0
ISP-Router(config-if)# ip address 203.0.113.1 255.255.255.252
```

### **Problem 5: IP Address Conflicts**
**Issue**: DHCP pool included gateway and infrastructure IPs
**Root Cause**: DHCP pool configured with full subnet range
**Solution**: Excluded gateway and infrastructure IPs
```
Core-Router(config)# ip dhcp pool Students
Core-Router(dhcp-config)# network 192.168.10.0 255.255.255.0
Core-Router(dhcp-config)# default-router 192.168.10.1
Core-Router(dhcp-config)# dns-server 8.8.8.8
Core-Router(dhcp-config)# exit
Core-Router(config)# ip dhcp excluded-address 192.168.10.1 192.168.10.10
```

---

## 🧪 Verification & Testing Log

### **Phase 5 Verification Results**

#### **1. DHCP Verification**
```
Core-Router# show ip dhcp binding
IP address       Client-ID/              Lease expiration        Type
                 Hardware address
192.168.10.11    0100.50da.2a3b.4c      Jan 01 2025 02:00 PM    Automatic
192.168.20.12    0100.50da.2a3b.4d      Jan 01 2025 02:00 PM    Automatic
192.168.30.13    0100.50da.2a3b.4e      Jan 01 2025 02:00 PM    Automatic
```

#### **2. VLAN Configuration Verification**
```
Access-Switch# show vlan brief
VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active    Fa0/2, Fa0/3, Fa0/4, Fa0/5
10   Students                         active    Fa0/1
20   Faculty                          active    Fa0/6
30   Labs                             active    Fa0/7
40   Admins                           active    Fa0/8
50   Management                       active    Fa0/9
```

#### **3. Inter-VLAN Routing Verification**
```
Core-Router# show ip route
Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area
       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
       E1 - OSPF external type 1, E2 - OSPF external type 2

Gateway of last resort is 203.0.113.1 to network 0.0.0.0

C    192.168.10.0/24 is directly connected, Vlan10
C    192.168.20.0/24 is directly connected, Vlan20
C    192.168.30.0/24 is directly connected, Vlan30
C    192.168.40.0/24 is directly connected, Vlan40
C    192.168.50.0/24 is directly connected, Vlan50
C    203.0.113.0/30 is directly connected, GigabitEthernet0/0
S*   0.0.0.0/0 [1/0] via 203.0.113.1
```

#### **4. NAT Translation Verification**
```
Core-Router# show ip nat translations
Pro Inside global      Inside local       Outside local      Outside global
tcp 203.0.113.2:1024  192.168.10.11:1024 8.8.8.8:80         8.8.8.8:80
tcp 203.0.113.2:1025  192.168.20.12:1025 8.8.8.8:80         8.8.8.8:80
```

#### **5. End-to-End Connectivity Test**
```
Student-PC> ping 192.168.10.1
Pinging 192.168.10.1 with 32 bytes of data:
Reply from 192.168.10.1: bytes=32 time=1ms TTL=255
Reply from 192.168.10.1: bytes=32 time=1ms TTL=255
Reply from 192.168.10.1: bytes=32 time=1ms TTL=255
Reply from 192.168.10.1: bytes=32 time=1ms TTL=255

Student-PC> ping 8.8.8.8
Pinging 8.8.8.8 with 32 bytes of data:
Reply from 8.8.8.8: bytes=32 time=2ms TTL=63
Reply from 8.8.8.8: bytes=32 time=2ms TTL=63
Reply from 8.8.8.8: bytes=32 time=2ms TTL=63
Reply from 8.8.8.8: bytes=32 time=2ms TTL=63
```

#### **6. HTTP Service Verification**
```
Student-PC> http://8.8.8.8
HTTP/1.1 200 OK
Server: Apache/2.4.41
Content-Type: text/html
Content-Length: 1234

<!DOCTYPE html>
<html>
<head><title>Welcome to Internet Server</title></head>
<body>
<h1>Network Connectivity Successful!</h1>
<p>This confirms end-to-end connectivity from campus LAN to Internet.</p>
</body>
</html>
```

---

## 📸 Screenshot Checklist for Portfolio

1. **Topology diagram** (logical + physical views).
2. **Core Router**: `show run`, `show ip dhcp binding`, `show ip nat translations`.
3. **ISP Router**: `show run`, `show ip route`.
4. **Switches**: `show vlan brief`, `show interface trunk`.
5. **PCs**: IP config (DHCP assigned), ping gateway, ping 8.8.8.8, HTTP to 8.8.8.8.
6. **Server (8.8.8.8)**: Config tab (IP + GW), Services tab (HTTP/DNS).

---

## 🏆 Final Outcome

This project shows a **realistic CCNA-level campus build** with:

* VLAN segmentation
* Inter-VLAN routing
* DHCP services
* NAT/PAT for Internet access
* ISP router simulation
* End-to-end verification

It's portfolio-ready as a **case study in network design, troubleshooting, and problem-solving**.

---

## 📁 Project Files

```
netops-showcase-aws/
├── packet-tracer/
│   ├── network-designs/
│   │   ├── campus-network.pkt          # Main campus network topology
│   │   └── enterprise-network.pkt      # Extended enterprise design
│   ├── security-labs/
│   │   └── firewall-configuration.pkt  # Security implementation
│   └── troubleshooting/
│       └── network-diagnostics.pkt     # Troubleshooting scenarios
├── Projects/
│   ├── network-designs/                # Additional network topologies
│   ├── security-labs/                  # Security configurations
│   └── troubleshooting/                # Diagnostic procedures
└── scripts/
    └── config-templates/               # Switch and router configs
```

## 🛠️ Technical Implementation

### Network Components
- **Core Router**: Inter-VLAN routing, DHCP server, NAT/PAT
- **Distribution Switches**: VLAN trunking, spanning tree
- **Access Switches**: Port configuration, VLAN assignment
- **ISP Router**: Internet connectivity simulation
- **End Devices**: PCs, servers, network services

### VLAN Configuration
- **VLAN 10**: Students (192.168.10.0/24)
- **VLAN 20**: Faculty (192.168.20.0/24)
- **VLAN 30**: Labs (192.168.30.0/24)
- **VLAN 40**: Admins (192.168.40.0/24)
- **VLAN 50**: Management (192.168.50.0/24)

### Key Commands Used
```cisco
# VLAN Configuration
vlan 10
 name Students

# Inter-VLAN Routing
interface vlan 10
 ip address 192.168.10.1 255.255.255.0

# DHCP Configuration
ip dhcp pool Students
 network 192.168.10.0 255.255.255.0
 default-router 192.168.10.1
 dns-server 8.8.8.8

# NAT Configuration
ip nat inside source list 1 interface g0/0 overload
access-list 1 permit 192.168.0.0 0.0.255.255
```

## 🎓 Skills Demonstrated

- **Network Design**: Hierarchical campus network architecture
- **VLAN Implementation**: Segmentation and inter-VLAN routing
- **DHCP Services**: Dynamic IP address assignment
- **NAT/PAT**: Internet connectivity for private networks
- **Troubleshooting**: Systematic problem identification and resolution
- **Documentation**: Clear project timeline and problem-solving process

## 🚀 Getting Started

1. **Download Cisco Packet Tracer** (8.0 or later)
2. **Open the project files** in Packet Tracer
3. **Follow the timeline** to understand the build process
4. **Review configurations** using the screenshot checklist
5. **Test connectivity** end-to-end

## 📸 Project Screenshots

### Network Topology
![Campus Network Topology](../../screenshots/netops/netops-topology.png)
*Complete campus network design showing Core Router, Distribution/Access switches, and end devices*

### Core Router Configuration
![Core Router Configuration](../../screenshots/netops/netops-core-router-config.png)
*Core Router setup with inter-VLAN routing, DHCP pools, and NAT/PAT configuration*

### ISP Router Configuration
![ISP Router Configuration](../../screenshots/netops/netops-isp-router-config.png)
*ISP Router configuration showing WAN connectivity and routing table*

### Switch VLAN Configuration
![Switch VLAN Configuration](../../screenshots/netops/netops-switch-vlans.png)
*Access switch configuration showing VLAN assignments and trunking*

### End-to-End Connectivity Test
![PC Connectivity Test](../../screenshots/netops/netops-pc-connectivity.png)
*Student PC successfully pinging gateway and external server (8.8.8.8)*

### Internet Server Configuration
![Internet Server Configuration](../../screenshots/netops/netops-server-config.png)
*Internet server setup with HTTP services and proper gateway configuration*

---

## 🎯 Screenshot Documentation

Each screenshot demonstrates key networking concepts:

1. **Topology**: Shows the complete network architecture and device relationships
2. **Router Config**: Displays inter-VLAN routing, DHCP services, and NAT implementation
3. **ISP Router**: Illustrates WAN connectivity and routing configuration
4. **Switch Config**: Shows VLAN segmentation and trunking setup
5. **Connectivity**: Proves end-to-end communication from LAN to Internet
6. **Server Config**: Demonstrates proper server configuration and services

---

*This project demonstrates real-world networking skills and problem-solving abilities suitable for CCNA-level positions.*