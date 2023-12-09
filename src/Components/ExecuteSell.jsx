import React, { useEffect, useState } from 'react'
import {ethers} from 'ethers';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ERC20_ABI, PolygonContractAddress } from '../Constant/Constant';
import { connectWallet, getProvider, getSigner } from './EVMConnect';
import { ESL_ABI, PolygonESLContractAddress } from '../Constant/Constant';

function ExecuteSell() {
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [buyOrdersData, setBuyOrdersData] = useState([])

 
  const connectWalletFn = async() => {
    let connect = await connectWallet();
    let pro = await getProvider()
    setProvider(pro)
    let sig = await getSigner();
    setSigner(sig);
    setIsConnected(true)
  }

  const getLiveSellOrders = async() => {
    let contractInstance = new ethers.Contract(PolygonESLContractAddress, ESL_ABI, provider);
    
    let openOrders = await contractInstance.sellOrderCount()
    console.log("first order", openOrders.toString())

    for (let i = 0; i < parseInt(openOrders.toString()); i ++) {
      let data = await contractInstance.OpenSellOrders(i)
      console.log(data)
      setBuyOrdersData((order)=>[...order,data]);
    }
  }

  useEffect(() => {
    if (isConnected) {
      getLiveSellOrders()

    }
  },[isConnected])
  

  const executeSellFun = async(index, ord) => {
    
    let erc20ContractInstance = new ethers.Contract(ord.TokenB, ERC20_ABI, signer)
    let decimals = await erc20ContractInstance.decimals();
    decimals = decimals.toString()

    try {
      // Approving TokensB
      let approveTx = await erc20ContractInstance.approve(PolygonESLContractAddress,(ord.Amount.toString()))
      await approveTx.wait();
      toast.success("Token Approved Successfully!", { position: toast.POSITION.TOP_CENTER, theme: "dark"});
    } catch (error) {
      toast.error("Unable to Approved tokens!", { position: toast.POSITION.TOP_CENTER, theme: "dark"});
      
    }
    
    
    let contractInstance = new ethers.Contract(PolygonESLContractAddress, ESL_ABI, signer);
    
    try {
      
      let executeOrder = await contractInstance.executeSellOrder(index)
      await executeOrder.wait();
      toast.success("Order executed Successfully :)", { position: toast.POSITION.TOP_CENTER, theme: "dark"});
    } catch (error) {
      toast.error("Unable to Send tokens!", { position: toast.POSITION.TOP_CENTER, theme: "dark"});
      
    }
  }
  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  
  return isConnected? (
    <div className="buy-orders-page">
    <div className="heading2">
      <span>Sell Orders</span>
    </div>
      <div className="cards-holder">
        {buyOrdersData.map(( ord, index) => (
          <div className="order-card">
          <span className="order-heading">Order</span>
          <div className="card-header">

          <div className="token-address address">
            <span className="name">Token A</span>
            {/* <span>{ord.TokenA}</span> */}
            <span>{(getKeyByValue(PolygonContractAddress,ord.TokenA.toLowerCase()))}</span>
          </div>
          <div className="token-address address">
            <span className="name">Token B</span>
            {/* <span>{ord.TokenB}</span> */}
            <span>{(getKeyByValue(PolygonContractAddress,ord.TokenB.toLowerCase()))}</span>
          </div>
           
          <div className="user-address address">
            <span className="name">Wallet address</span>
            <span>{ord.userAddress}</span>
          </div>
          <div className="buy-amount">
            <span className="name">Price</span>
            <span>{ord.Amount.toString() / 10 ** 18}</span>
          </div>
          </div>
            <button onClick={ () => executeSellFun(index, ord)} className='custome-buy-btn custome-sell-btn'>Sell</button>
          </div>
        ))}
      </div>

      {/* <button onClick={getLiveBuyOrders}>getLiveBuyOrders</button>  */}

    </div>
  ): (<div className='buy-orders-page'>
    <button onClick={connectWalletFn} className='custome-connect-btn'>Connect Wallet</button>
  </div>)
}

export default ExecuteSell