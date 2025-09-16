# Packet Tracer Build Instructions

This guide provides step-by-step instructions for building the network topologies in Cisco Packet Tracer.

## Prerequisites

- Cisco Packet Tracer 8.0 or later
- Basic understanding of networking concepts
- Familiarity with Cisco IOS commands

## General Build Process

### 1. Create New Project
1. Open Cisco Packet Tracer
2. Click "File" → "New" or press Ctrl+N
3. Save the project with the appropriate name

### 2. Add Devices
1. Select device category from the device panel
2. Drag devices to the workspace
3. Position devices according to the topology diagrams

### 3. Make Connections
1. Select appropriate cable type
2. Click on source device and select interface
3. Click on destination device and select interface
4. Verify connections are properly established

### 4. Configure Devices
1. Click on each device to open configuration window
2. Use CLI tab for command-line configuration
3. Copy and paste configuration scripts from the templates
4. Save configurations

### 5. Test Connectivity
1. Use ping command to test connectivity
2. Use traceroute to verify routing paths
3. Test VLAN functionality
4. Verify security policies

## Campus Network Build Instructions

### Step 1: Add Core Devices
1. **Add Core Switches**
   - Drag 2x "2960-24TT" switches to center of workspace
   - Rename to "Core-1" and "Core-2"
   - Position side by side

2. **Add Core Router**
   - Drag 1x "1941" router below core switches
   - Rename to "Core-Router"

3. **Add Internet Gateway**
   - Drag 1x "2811" router to the right
   - Rename to "Internet-Gateway"

### Step 2: Add Distribution Layer
1. **Building A Distribution**
   - Drag 2x "2960-24TT" switches below core
   - Rename to "Dist-A1" and "Dist-A2"
   - Position side by side

2. **Building B Distribution**
   - Drag 2x "2960-24TT" switches to the left
   - Rename to "Dist-B1" and "Dist-B2"
   - Position side by side

3. **Building C Distribution**
   - Drag 2x "2960-24TT" switches to the right
   - Rename to "Dist-C1" and "Dist-C2"
   - Position side by side

### Step 3: Add Access Layer
1. **Building A Access Switches**
   - Drag 4x "2960-24TT" switches below Dist-A switches
   - Rename to "Access-A1", "Access-A2", "Access-A3", "Access-A4"

2. **Building B Access Switches**
   - Drag 3x "2960-24TT" switches below Dist-B switches
   - Rename to "Access-B1", "Access-B2", "Access-B3"

3. **Building C Access Switches**
   - Drag 3x "2960-24TT" switches below Dist-C switches
   - Rename to "Access-C1", "Access-C2", "Access-C3"

### Step 4: Add Servers
1. **Add Server Devices**
   - Drag 4x "Generic Server" devices near core switches
   - Rename to "DHCP-Server", "DNS-Server", "Web-Server", "File-Server"

### Step 5: Add End Devices
1. **Add PCs**
   - Drag 8x "PC" devices near Building A access switches
   - Drag 6x "PC" devices near Building B access switches
   - Drag 6x "PC" devices near Building C access switches

2. **Add Laptops**
   - Drag 3x "Laptop" devices (one per building)
   - Position near access switches

### Step 6: Make Physical Connections
1. **Core Layer Connections**
   - Connect Core-1 to Core-2 using GigabitEthernet 0/1
   - Connect Core-1 to Dist-A1 using GigabitEthernet 0/2
   - Connect Core-1 to Dist-A2 using GigabitEthernet 0/3
   - Connect Core-2 to Dist-A1 using GigabitEthernet 0/2
   - Connect Core-2 to Dist-A2 using GigabitEthernet 0/3

2. **Inter-Building Connections**
   - Connect Core-1 to Dist-B1 using GigabitEthernet 0/4
   - Connect Core-1 to Dist-B2 using GigabitEthernet 0/5
   - Connect Core-2 to Dist-B1 using GigabitEthernet 0/4
   - Connect Core-2 to Dist-B2 using GigabitEthernet 0/5
   - Connect Core-1 to Dist-C1 using GigabitEthernet 0/6
   - Connect Core-1 to Dist-C2 using GigabitEthernet 0/7
   - Connect Core-2 to Dist-C1 using GigabitEthernet 0/6
   - Connect Core-2 to Dist-C2 using GigabitEthernet 0/7

3. **Distribution to Access Connections**
   - Connect Dist-A1 to Access-A1 using FastEthernet 0/1
   - Connect Dist-A1 to Access-A2 using FastEthernet 0/2
   - Connect Dist-A2 to Access-A3 using FastEthernet 0/1
   - Connect Dist-A2 to Access-A4 using FastEthernet 0/2
   - Repeat for Buildings B and C

4. **Server Connections**
   - Connect Core-1 to servers using FastEthernet 0/8-11

5. **End Device Connections**
   - Connect PCs and laptops to access switches using FastEthernet ports

### Step 7: Configure Devices
1. **Configure Core Switches**
   - Open Core-1 configuration
   - Go to CLI tab
   - Copy and paste Core-1 configuration from template
   - Repeat for Core-2

2. **Configure Distribution Switches**
   - Configure each distribution switch using the template

3. **Configure Access Switches**
   - Configure each access switch using the template

4. **Configure Router**
   - Configure Core-Router using the template

5. **Configure Servers**
   - Set IP addresses, subnet masks, and gateways
   - Configure services (DHCP, DNS, etc.)

6. **Configure End Devices**
   - Set IP addresses for PCs and laptops
   - Configure gateways and DNS servers

### Step 8: Test and Verify
1. **Test Connectivity**
   - Ping from PC to PC
   - Ping from PC to server
   - Test internet connectivity

2. **Verify VLANs**
   - Check VLAN assignments
   - Test inter-VLAN routing

3. **Test Services**
   - Verify DHCP functionality
   - Test DNS resolution
   - Check web server access

## Enterprise Network Build Instructions

### Step 1: Add Core Devices
1. **Add Core Switches**
   - Drag 2x "3750-24PS" switches to center
   - Rename to "Core-1" and "Core-2"

2. **Add Core Router**
   - Drag 1x "3945" router below core switches
   - Rename to "Core-Router"

### Step 2: Add Distribution Layer
1. **Add Distribution Switches**
   - Drag 2x "3750-24PS" switches below core
   - Rename to "Dist-1" and "Dist-2"

2. **Add Firewall**
   - Drag 1x "ASA 5510" firewall to the right
   - Rename to "ASA-Firewall"

### Step 3: Add Access Layer
1. **Add Access Switches**
   - Drag 4x "2960-24TT" switches below distribution
   - Rename to "Access-1", "Access-2", "Access-3", "Access-4"

### Step 4: Add DMZ Components
1. **Add DMZ Switch**
   - Drag 1x "2960-24TT" switch to the right of firewall
   - Rename to "DMZ-Switch"

2. **Add DMZ Servers**
   - Drag 3x "Generic Server" devices near DMZ switch
   - Rename to "Web-Server", "Mail-Server", "DNS-Server"

### Step 5: Add Internal Servers
1. **Add Internal Servers**
   - Drag 4x "Generic Server" devices near distribution switches
   - Rename to "File-Server", "Database-Server", "Application-Server", "DHCP-Server"

### Step 6: Add End Devices
1. **Add Workstations**
   - Drag 8x "PC" devices near access switches

2. **Add Guest Devices**
   - Drag 2x "Laptop" devices near Access-3

3. **Add Printer**
   - Drag 1x "Printer" device near Access-4

### Step 7: Add Internet Simulation
1. **Add Cloud**
   - Drag 1x "Cloud" device to the right
   - Rename to "Internet-Cloud"

2. **Add External Server**
   - Drag 1x "Generic Server" near cloud
   - Rename to "External-Web"

### Step 8: Make Connections
1. **Core Layer Connections**
   - Connect Core-1 to Core-2
   - Connect Core-1 to Dist-1
   - Connect Core-1 to Dist-2
   - Connect Core-2 to Dist-1
   - Connect Core-2 to Dist-2

2. **Distribution Connections**
   - Connect Dist-1 to Access-1 and Access-2
   - Connect Dist-2 to Access-3 and Access-4
   - Connect ASA-Firewall to Dist-1 and Dist-2

3. **DMZ Connections**
   - Connect ASA-Firewall to DMZ-Switch
   - Connect DMZ-Switch to DMZ servers

4. **Internet Connections**
   - Connect ASA-Firewall to Internet-Cloud
   - Connect Core-Router to Internet-Cloud
   - Connect Internet-Cloud to External-Web

5. **End Device Connections**
   - Connect PCs to access switches
   - Connect laptops to Access-3
   - Connect printer to Access-4

### Step 9: Configure Devices
1. **Configure Core Devices**
   - Use the enterprise network configuration templates

2. **Configure Firewall**
   - Configure ASA using the firewall template

3. **Configure All Other Devices**
   - Use the appropriate configuration templates

### Step 10: Test and Verify
1. **Test Internal Connectivity**
   - Ping between workstations
   - Test server access

2. **Test DMZ Access**
   - Test web server access from internal network
   - Test external access to DMZ servers

3. **Test Security Policies**
   - Verify firewall rules
   - Test guest network isolation

4. **Test Internet Connectivity**
   - Test external web access
   - Verify NAT functionality

## Troubleshooting Tips

### Common Issues
1. **Connection Problems**
   - Check cable types
   - Verify interface configurations
   - Check for duplicate IP addresses

2. **VLAN Issues**
   - Verify trunk configurations
   - Check VLAN assignments
   - Test inter-VLAN routing

3. **Routing Problems**
   - Check routing tables
   - Verify default gateways
   - Test routing protocols

4. **Security Issues**
   - Check firewall rules
   - Verify ACL configurations
   - Test access policies

### Diagnostic Commands
```cisco
show ip route
show interfaces
show vlan
show spanning-tree
show mac address-table
ping
traceroute
show running-config
```

## Saving and Sharing

1. **Save Project**
   - Click "File" → "Save" or press Ctrl+S
   - Choose appropriate filename and location

2. **Export Configurations**
   - Copy device configurations to text files
   - Document network topology
   - Create troubleshooting guides

3. **Share Project**
   - Share .pkt files with team members
   - Provide configuration documentation
   - Include build instructions
