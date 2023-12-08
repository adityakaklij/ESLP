//SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


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
        emit BuyOrderCreated(msg.sender, _tokenA, _tokenB, _amount, _price);

    }

    function createSellOrder(address _tokenA, address _tokenB, uint _amount, uint8 _price) public {
        require(!isSellOrderLive[msg.sender], "Only one order at a time!");
        
        IERC20 token = IERC20(_tokenA);
        require(token.transferFrom(msg.sender, address(this),_amount), "Unable to deposite.");
        
        OpenSellOrders.push(Order (msg.sender, _tokenA, _tokenB, _amount, _price));
        isSellOrderLive[msg.sender] = true;
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
}

