pragma solidity >=0.5.0 <0.6.0;

contract ProductRepo {
    struct Product {
        string name;
        uint VAT;  // 24% e 24
        uint priceWithVAT; // all prices are * 100, no decimals
    }

    Product[] public products;
    string[] internal ids;

    mapping (string => uint[]) idToProducts;
    mapping (string => address) public productToOwner;

    function idExists(string memory id) public view returns (bool) {
        for (uint index = 0; index < ids.length; index++) {
            if (keccak256(abi.encodePacked(ids[index])) == keccak256(abi.encodePacked(id))) {
                return true;
            }
        }
        return false;
    }

    function productAdded(string memory id, string memory name, uint totalPrice, uint VAT) public view returns (bool) {
        require(idExists(id));
        for (uint index = 0; index < idToProducts[id].length; index++) {
            if (keccak256(abi.encodePacked(products[idToProducts[id][index]].name)) == keccak256(abi.encodePacked(name)) &&
                products[idToProducts[id][index]].priceWithVAT == totalPrice &&
                products[idToProducts[id][index]].VAT == VAT) {
                return true;
            }
        }

        return false;
    }

    // add modifier for only the owner of the product can update it
    function addProduct(string memory id, string memory name, uint totalPrice, uint VAT) public {
        require(productAdded(id, name, totalPrice, VAT) == false);
        if (idExists(id)) {
            require(productToOwner[id] == msg.sender);
        }
        else {
            productToOwner[id] = msg.sender;
        }
        uint index = products.push(Product(name, VAT, totalPrice)) - 1;
        idToProducts[id].push(index);
        ids.push(id);
    }

    // add modifier for only owner of the product and the ones that have permissions
    function getProduct(string memory id) public view returns(string memory, string memory, uint, uint) {
        require(idToProducts[id].length != 0);
        return (id,
        products[idToProducts[id][idToProducts[id].length - 1]].name,
        products[idToProducts[id][idToProducts[id].length - 1]].VAT,
        products[idToProducts[id][idToProducts[id].length - 1]].priceWithVAT);
    }
}
