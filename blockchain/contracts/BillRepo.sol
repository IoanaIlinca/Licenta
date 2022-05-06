pragma solidity >=0.5.0 <0.6.0;

contract BillRepo {


    struct BillEntry {
        string productId;
        uint quantity;
    }

    struct Bill {
        uint date;
        uint total; // again, multiplied by 100
    }

    Bill[] public bills;
    BillEntry[] public entries;

    mapping (uint => address) public billToOwner;
    mapping (string => uint) public orderToBillId;
    mapping (uint => uint[]) public billIdToEntryId;

    function createBill(string memory orderId, uint date, uint total) public {
        uint id = bills.push(Bill(date, total)) - 1;
        billToOwner[id] = msg.sender;
        orderToBillId[orderId] = id;
    }

    function addEntry(string memory orderId,  string memory productId, uint quantity) public {
        uint entryIndex = entries.push(BillEntry(productId, quantity)) - 1;
        uint billIndex = orderToBillId[orderId];
        billIdToEntryId[billIndex].push(entryIndex);
    }

   /* function getBillByOrderId(string memory orderId) public view returns (uint, uint, string[] memory, uint[] memory){
        Bill memory bill = bills[orderToBillId[orderId]];
        string[] memory ids = new string[](bill.entries.length);
        uint[] memory quantities = new uint[](bill.entries.length);
        for (uint i = 0; i < bill.entries.length; i++) {
            ids[i] = bill.entries[i].productId;
            quantities[i] = bill.entries[i].quantity;
        }
        return (bill.date, bill.total, ids, quantities);
    }*/


}
