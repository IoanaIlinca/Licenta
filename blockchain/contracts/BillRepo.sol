pragma solidity >=0.5.0 <0.6.0;

import "./ProductRepo.sol";

contract BillRepo is ProductRepo{


    struct BillEntry {
        uint productIndex;
        uint quantity;
    }

    struct Bill {
        uint date; // in miliseconds from 1 January 1970
        uint total; // again, multiplied by 100
    }

    Bill[] public bills;
    string[] internal orderIds;
    BillEntry[] public entries;

    mapping (uint => address) public billToOwner;
    mapping (string => uint) public orderToBillId;
    mapping (uint => uint[]) public billIdToEntryId;

    function idExistsOrders(string memory id) public view returns (bool) {
        for (uint index = 0; index < orderIds.length; index++) {
            if (keccak256(abi.encodePacked(ids[index])) == keccak256(abi.encodePacked(id))) {
                return true;
            }
        }
        return false;
    }
    // require order id not exist
    function createBill(string memory orderId, uint date, uint total) public {
        require(!idExistsOrders(orderId));
        uint id = bills.push(Bill(date, total)) - 1;
        billToOwner[id] = msg.sender;
        orderToBillId[orderId] = id;
        orderIds.push(orderId);
    }

    function addEntry(string memory orderId,  string memory productId, uint quantity) public {
        require(idExists(productId));
        uint entryIndex = entries.push(BillEntry(idToProducts[productId][idToProducts[productId].length - 1], quantity)) - 1;
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
