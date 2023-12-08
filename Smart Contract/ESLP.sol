//SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";



// PUSH Comm Contract Interface
interface IPUSHCommInterface {
    function sendNotification(address _channel, address _recipient, bytes calldata _identity) external;
}

contract ESL {

    struct Order {
        address userAddress;
        address TokenA;
        address TokenB;
        uint Amount;
        uint8 Price;
    }

    Order[] public OpenBuyOrders;
    Order[] public OpenSellOrders;

    mapping (address => bool) public isBuyOrderLive;
    mapping (address => bool) public isSellOrderLive;

    event BuyOrderCreated(
        address userAddress,
        address TokenA,
        address TokenB,
        uint Amount,
        uint8 Price
    );

    event SellOrderCreated(
        address userAddress,
        address TokenA,
        address TokenB,
        uint Amount,
        uint8 Price
    );
    event BuyOrderExecuted (
        address FromAddress, // User that execute the order.
        address ToAddress, // // User that Created the order.
        uint Amount
    );
    event SellOrderExecuted (
        address FromAddress,
        address ToAddress,
        uint Amount
    );

    function createBuyOrder(address _tokenA, address _tokenB, uint _amount, uint8 _price) public {
        require(!isBuyOrderLive[msg.sender], "Only one order at a time!");
        
        IERC20 token = IERC20(_tokenA);
        require(token.transferFrom(msg.sender, address(this), _amount ),"Unable to Deposite");
        
        OpenBuyOrders.push(Order (msg.sender, _tokenA, _tokenB, _amount , _price)); // (1 USD = 100, 0.9 USD = 90; The price will be between 0-100)
        isBuyOrderLive[msg.sender] = true;

        // Push Integration 

        IPUSHCommInterface(0x0C34d54a09CFe75BCcd878A469206Ae77E0fe6e7).sendNotification(
        0x76Ae1122e702f22827cd3246370f796B666634DB, // from channel - recommended to set channel via dApp and put it's value -> then once contract is deployed, go back and add the contract address as delegate for your channel
        address(this),
        bytes(
            string(
                
                abi.encodePacked(
                    "Buy Order Generated",
                    "+", // segregator
                    "1", // 
                    "+", // segregator
                    "Order at price", // this is notification title
                    // uint2str(_price),
                    "Token",
                    addressToString(_tokenA),
                    "+", // segregator
                    "Stabel Coin" // notification body
                    )
                )
            )
        );

        emit BuyOrderCreated(msg.sender, _tokenA, _tokenB, _amount, _price);

    }

    function createSellOrder(address _tokenA, address _tokenB, uint _amount, uint8 _price) public {
        require(!isSellOrderLive[msg.sender], "Only one order at a time!");
        
        IERC20 token = IERC20(_tokenA);
        require(token.transferFrom(msg.sender, address(this),_amount), "Unable to deposite.");
        
        OpenSellOrders.push(Order (msg.sender, _tokenA, _tokenB, _amount, _price));
        isSellOrderLive[msg.sender] = true;

        // Push Integration 

        IPUSHCommInterface(0x0C34d54a09CFe75BCcd878A469206Ae77E0fe6e7).sendNotification(
        0x76Ae1122e702f22827cd3246370f796B666634DB, // from channel - recommended to set channel via dApp and put it's value -> then once contract is deployed, go back and add the contract address as delegate for your channel
        address(this),
        bytes(
            string(
                
                abi.encodePacked(
                    "Sell Order Generated",
                    "+", // segregator
                    "1", // 
                    "+", // segregator
                    "Order at price", // this is notification title
                    // uint2str(_price),
                    "Token",
                    addressToString(_tokenA),
                    "+", // segregator
                    "Stabel Coin" // notification body
                    )
                )
            )
        );

        emit SellOrderCreated(msg.sender, _tokenA, _tokenB, _amount, _price);
    }

    // Enter the order index from the "OpenBuyOrders" Array.
    function executeBuyOrder(uint64 _orderIndex) public {
        Order storage order = OpenBuyOrders[_orderIndex];
        require(isBuyOrderLive[order.userAddress], "Order does not exist");
        
        // Sent TokenB from user & then release TokenA to user.
        IERC20 tokenB = IERC20(order.TokenB);
        require(tokenB.transferFrom(msg.sender, order.userAddress, order.Amount ), "Unable to deposite tokens.");
        
        IERC20 tokenA = IERC20(order.TokenA);
        require(tokenA.transfer( msg.sender, order.Amount), "Unable to forward tokens.");

        isBuyOrderLive[msg.sender] = false;
        deleteBuyLiveOrder(_orderIndex); // Deleting the Live order.
        emit BuyOrderExecuted (msg.sender, order.userAddress, order.Amount);

    }

    function executeSellOrder(uint64 _orderIndex) public {
        Order storage order = OpenSellOrders[_orderIndex];
        require(isSellOrderLive[order.userAddress], "Order does not exist");
        
        // Sent TokenB from user & then release TokenA to user.
        IERC20 tokenB = IERC20(order.TokenB);
        require(tokenB.transferFrom(msg.sender, order.userAddress, order.Amount), "Unable to deposite tokens.");
        
        IERC20 tokenA = IERC20(order.TokenA);
        require(tokenA.transfer( msg.sender, order.Amount), "Unable to forward tokens.");

        isSellOrderLive[msg.sender] = false;
        deleteSellLiveOrder(_orderIndex); // Deleting the Live order.
        emit SellOrderExecuted (msg.sender, order.userAddress, order.Amount);

    }

    function cancelBuyOrder(uint _orderIndex) public {
        Order storage order = OpenBuyOrders[_orderIndex];
        require(isBuyOrderLive[order.userAddress], "Order does not exist");
        IERC20 tokenA = IERC20(order.TokenA);
        require(tokenA.transfer( order.userAddress, order.Amount), "Unable to forward tokens.");
        isBuyOrderLive[msg.sender] = false;
        deleteBuyLiveOrder(_orderIndex); // Deleting the Live order.
    }

    function cancelSellOrder(uint _orderIndex) public {
        Order storage order = OpenSellOrders[_orderIndex];
        require(isSellOrderLive[order.userAddress], "Order does not exist");
        IERC20 tokenA = IERC20(order.TokenA);
        require(tokenA.transfer( order.userAddress, order.Amount), "Unable to forward tokens.");
        isSellOrderLive[msg.sender] = false;
        deleteSellLiveOrder(_orderIndex); // Deleting the Live order.
    }


    // Helper Functions
    // If user A wants to withdraw/ Cancel the offer, the below function is used.
    function deleteBuyLiveOrder(uint _orderIndex) internal {
        OpenBuyOrders[_orderIndex] = OpenBuyOrders[OpenBuyOrders.length - 1];
        OpenBuyOrders.pop();
    }
    // If user A wants to withdraw/ Cancel the offer, the below function is used.
    function deleteSellLiveOrder(uint _orderIndex) internal {
        OpenSellOrders[_orderIndex] = OpenSellOrders[OpenSellOrders.length - 1];
        OpenSellOrders.pop();
    }

    function buyOrderCount() public view returns(uint){
        return OpenBuyOrders.length;
    }

    function sellOrderCount() public view returns(uint){
        return OpenSellOrders.length;
    }    

     // Helper function to convert address to string
    function addressToString(address _address) internal pure returns(string memory) {
        bytes32 _bytes = bytes32(uint256(uint160(_address)));
        bytes memory HEX = "0123456789abcdef";
        bytes memory _string = new bytes(42);
        _string[0] = '0';
        _string[1] = 'x';
        for(uint i = 0; i < 20; i++) {
            _string[2+i*2] = HEX[uint8(_bytes[i + 12] >> 4)];
            _string[3+i*2] = HEX[uint8(_bytes[i + 12] & 0x0f)];
        }
        return string(_string);
    }


}

