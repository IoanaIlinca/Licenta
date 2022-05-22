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
    string[] public orderIds;
    BillEntry[] public entries;

    mapping (uint => address) public billToOwner;
    mapping (string => uint) public orderToBillId;
    mapping (uint => uint[]) public billIdToEntryId;

    function idExistsOrders(string memory id) public view returns (bool) {
        for (uint index = 0; index < orderIds.length; index++) {
            if (keccak256(abi.encodePacked(orderIds[index])) == keccak256(abi.encodePacked(id))) {
                return true;
            }
        }
        return false;
    }

    function entryExists(uint prodIndex, uint quantity) public view returns (int) {
        for (int index = 0; uint(index) < entries.length; index++) {
            if (entries[uint(index)].productIndex == prodIndex && entries[uint(index)].quantity == quantity) {
                return index;
            }
        }
        return -1;
    }


    // require order id not exist
    function createBill(string memory orderId, uint date, uint total) public {
        require(idExistsOrders(orderId) == false);
        uint id = bills.push(Bill(date, total)) - 1;
        billToOwner[id] = msg.sender;
        orderToBillId[orderId] = id;
        orderIds.push(orderId);
    }

    // check if entry exists, if so, reuse it
    function addEntry(string memory orderId,  string memory productId, uint quantity) public {
        require(idExists(productId));
        int index = entryExists(idToProducts[productId][idToProducts[productId].length - 1], quantity);
        if (index != -1) {
            uint billIndex = orderToBillId[orderId];
            billIdToEntryId[billIndex].push(uint(index));
        }
        else {
            uint entryIndex = entries.push(BillEntry(idToProducts[productId][idToProducts[productId].length - 1], quantity)) - 1;
            uint billIndex = orderToBillId[orderId];
            billIdToEntryId[billIndex].push(entryIndex);
        }
    }

    function getBillByOrderId(string memory orderId) public view returns (uint, uint){
        return (bills[orderToBillId[orderId]].date, bills[orderToBillId[orderId]].total);
    }


    function getProductForEntry(string memory orderId, uint entryNumber) public view returns( string memory, uint, uint) {
        uint index = entries[billIdToEntryId[orderToBillId[orderId]][entryNumber]].productIndex;
        return (
        products[index].name,
        products[index].VAT,
        products[index].priceWithVAT);
    }

    function getProductNameForEntry(string memory orderId, uint entryNumber) public view returns (string memory) {
        return products[entries[billIdToEntryId[orderToBillId[orderId]][entryNumber]].productIndex].name;
    }

    function getVATsByOrderId(string memory orderId) public view returns (uint[] memory) {
        uint[] memory VATs = new uint[](billIdToEntryId[orderToBillId[orderId]].length);
        for (uint i = 0; i < billIdToEntryId[orderToBillId[orderId]].length; i++) {
            VATs[i] = products[entries[billIdToEntryId[orderToBillId[orderId]][i]].productIndex].VAT;
        }
        return VATs;
    }

    function getPricesByOrderId(string memory orderId) public view returns (uint[] memory) {
        uint[] memory prices = new uint[](billIdToEntryId[orderToBillId[orderId]].length);
        for (uint i = 0; i < billIdToEntryId[orderToBillId[orderId]].length; i++) {
            prices[i] = products[entries[billIdToEntryId[orderToBillId[orderId]][i]].productIndex].priceWithVAT;
        }
        return prices;
    }

    function getQuantitiesByOrderId(string memory orderId) public view returns (uint[] memory) {
        uint[] memory quantities = new uint[](billIdToEntryId[orderToBillId[orderId]].length);
        for (uint i = 0; i < billIdToEntryId[orderToBillId[orderId]].length; i++) {
            quantities[i] = entries[billIdToEntryId[orderToBillId[orderId]][i]].quantity;
        }
        return quantities;
    }

}
