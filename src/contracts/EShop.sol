pragma solidity ^0.5.0;

contract EShop{
    string public name;
    uint public productCount = 0;
    mapping(uint => Product) public products;
    struct Product {
        uint id;
        string name;
        uint price;
        string manufacture;
        string details;
        uint mfgdate;
        address payable owner;
        bool purchased;
    }
    event ProductCreated (
        uint id,
        string name,
        uint price,
        string manufacture,
        string details,
        uint mfgdate,
        address payable owner,
        bool purchased
    );
    event ProductPurchased (
        uint id,
        string name,
        uint price,
        string manufacture,
        string details,
        uint mfgdate,
        address payable owner,
        bool purchased
    );
    constructor() public {
        name = "eShop";
    }
    function createProduct(string memory _name, uint _price, string memory _manufacture, string memory _details, uint _mfgdate) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        //requird a valid price
        require(_price > 0);

        // Increment product count
        productCount ++;

        // Create the product
        products [productCount] = Product(productCount, _name, _price, _manufacture, _details, _mfgdate, msg.sender, false);
       
        // Trigger on event ProductCreated
        emit ProductCreated(productCount, _name, _price, _manufacture, _details, _mfgdate, msg.sender, false);
    }

    function purchaseProduct(uint _id) public payable{
        //Fetch the product
        Product memory _product = products[_id];
        // Fetch the owner
        address payable _seller = _product.owner;

        // Make sure that product has a valid id
        require(_product.id > 0 && _product.id <= productCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _product.price);
        //Require that the product has not been purchased already
        require(!_product.purchased);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);

        //Transfer ownership to the buyer
        _product.owner = msg.sender;

        //Make as purchased
        _product.purchased = true;

        //Update the product
        products[_id] = _product;

        //Pay the selller by sending them Ether
        address(_seller).transfer(msg.value);

        // Trigger an event ProductPurchased
        emit ProductPurchased(productCount, _product.name, _product.price, _product.manufacture, _product.details, _product.mfgdate, msg.sender, true);

    }
}