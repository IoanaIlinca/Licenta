pragma solidity >=0.5.0 <0.6.5;


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
    mapping (string => address[]) public productToPermissions;

    function idExists(string memory id) public view returns (bool) {
        for (uint index = 0; index < ids.length; index++) {
            if (keccak256(abi.encodePacked(ids[index])) == keccak256(abi.encodePacked(id))) {
                return true;
            }
        }
        return false;
    }

    function productAdded(string memory id, string memory name, uint totalPrice, uint VAT) public view returns (bool) {
        if (idExists(id) == false)
            return false;
        for (uint index = 0; index < idToProducts[id].length; index++) {
            if (keccak256(abi.encodePacked(products[idToProducts[id][index]].name)) == keccak256(abi.encodePacked(name)) &&
            products[idToProducts[id][index]].priceWithVAT == totalPrice &&
                products[idToProducts[id][index]].VAT == VAT) {
                return true;
            }
        }

        return false;
    }

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

    function getProduct(string memory id) public hasPermissions(id) view returns(string memory, string memory, uint, uint) {
        require(idToProducts[id].length != 0);
        return (id,
        products[idToProducts[id][idToProducts[id].length - 1]].name,
        products[idToProducts[id][idToProducts[id].length - 1]].VAT,
        products[idToProducts[id][idToProducts[id].length - 1]].priceWithVAT);
    }

    function inPermissions(string memory id) public view returns (bool) {
        for (uint index = 0; index < productToPermissions[id].length; index++) {
            if (productToPermissions[id][index] == msg.sender) {
                return true;
            }
        }
        return false;
    }

    modifier hasPermissions(string memory id) {
        require(productToOwner[id] == msg.sender || inPermissions(id));
        _;
    }

    function grantPermissions(string memory id, address newPermission) public {
        require(productToOwner[id] == msg.sender);
        productToPermissions[id].push(newPermission);
    }
}
