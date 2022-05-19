pragma solidity >=0.5.0 <0.6.0;

contract ProductRepo {
    struct Product {
        string name;
        uint VAT;  // 24% e 24
        uint priceWithVAT; // all prices are * 100, no decimals
    }

    Product[] public products;

    mapping (string => Product) idToProduct;
    mapping (string => address) public productToOwner;

    function productAdded(string memory id) public returns (bool) {
        if (idToProduct[id].priceWithVAT != 0) {
            return true;
        }
        return false;
    }

    function addProduct(string memory id, string memory name, uint totalPrice, uint VAT) public {
        require(productAdded(id) == false);
        uint index = products.push(Product(name, VAT, totalPrice)) - 1;
        idToProduct[id].name = name;
        idToProduct[id].VAT = VAT;
        idToProduct[id].priceWithVAT = totalPrice;
        productToOwner[id] = msg.sender;
    }

    function setName(string memory id, string memory name) public {
        idToProduct[id].name = name;
    }

    function setPrice(string memory id, uint totalPrice) public {
        idToProduct[id].priceWithVAT = totalPrice;
    }

    function setVAT(string memory id, uint VAT) public {
        idToProduct[id].VAT = VAT;
    }

    function getProduct(string memory id) public view returns(string memory, string memory, uint, uint) {
        require(idToProduct[id].priceWithVAT != 0);
        return (id, idToProduct[id].name, idToProduct[id].VAT, idToProduct[id].priceWithVAT);
    }
}
