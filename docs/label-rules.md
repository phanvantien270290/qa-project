# C-Label - Label Rules

# PELCO 

# 1. Generate OEM Serial Number (OEM S/N) based on current date

OEM S/N = Chassis S/N + 01 + Date (10022019)

(OEM S/N = (Service Tag + Build No. + Manufacture Date))

Example:  
* S/N "ABC" -> OEM S/N generated on Api 01 2020 = "ABC0104012020)

**Apply for**:
- Pelco customer
- All Pelco part number (model). Excluded these model below:
    -  VXP-KIT-8TB
    -  VXP-KIT-4TB
    -  VXP-KIT-P2-PSU
    -  VXP-RK-FLEX


# 2. Generate OEM Serial Number based on Serial number user input

OEM S/N = S/N (input by users)

**Request from**: https://helpdesk.ccinteg.com/scp/tickets.php?id=1747

**Request details**: *"For the VXP-KIT-4TB, VXP-KIT-8TB, and VXP-KIT-P2-PSU, we should only use the serial number exactly as provided by Dell and not add any suffix to it.*

*For example, a Dell hard drive manufactured by Toshiba has a 12 character SN# like .... "Y9A0A0NXF1QF" whereas a drive manufactured by Seagate has 8 characters SN# like "ZA1CJ7GN".  We'll use the exact number as provided by the drive vendor."*

**Apply for**:
- Pelco customer
- 3 part number (model)
    -  VXP-KIT-8TB
    -  VXP-KIT-4TB
    -  VXP-KIT-P2-PSU


# 3. Generate OEM Serial Number based on 7 characters "321BBTV" (DELL SKU number) with extra 4 number

OEM S/N = 7 characters (321BBTV) + extra 4 number (0001, 0002, 0003, ..... based on Quantity of item)

Example: Part number "VXP-RK-FLEX" have Quantity = 5

- OEM S/N: 
    -  321BBTV0001
    -  321BBTV0002
    -  321BBTV0003
    -  321BBTV0004
    -  321BBTV0005


- 1st generate, VXP-RK-FLEX (Qty = 5) > system will generate from 0001 to 0005 > Printed
- 2nd generate, quantity = 3 > system will generate from 0006 to 0008 

**Request from**: https://helpdesk.ccinteg.com/scp/tickets.php?id=1747

**Request details**: *"The serial number sequence should be 321BBTV0001, 321BBTV0002, 321BBTV0003 and so on.  The first 7 characters are the Dell SKU# + 3 CCI generated characters starting with 001, 002, 003, 004 and so on.    Every time we build a new kit, the number will be auto generated without having user to input.  We also need the option to reprint any labels.*

*In the case of the VXP-RK-FLEX, user will still scan the 7 character SKU, 321BBTV, and when user click "PRINT", the program checks the database and see which was the last OEM SN# used and generate a new OEM SN# with the extra 4 numbers (0001, 0002, 0003, etc...)."*

**Apply for**:
- Pelco customer
- 1 part number (model)
    -  VXP-RK-FLEX