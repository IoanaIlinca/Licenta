pragma solidity >=0.5.0 <0.6.0;

contract ProductRepo {
    struct Product {
        string id;
        string name;
        uint VAT;  // 24% e 24
        uint priceWithVAT; // all prices are * 100, no decimals
    }

    Product[] public products;

    mapping (string => Product) idToProduct;
    mapping (string => address) public productToOwner;


    function addProduct(string memory id, string memory name, uint totalPrice, uint VAT) public {
        uint index = products.push(Product(id, name, VAT, totalPrice)) - 1;
        idToProduct[id] = products[index];
        productToOwner[id] = msg.sender;
    }

    function getProduct(string memory id) public view returns(string memory, string memory, uint, uint) {
       // if (idToProduct[id].isValue) {
            return (idToProduct[id].id, idToProduct[id].name, idToProduct[id].VAT, idToProduct[id].priceWithVAT);
      //  }
    }
}
