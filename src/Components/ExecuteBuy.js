import React, { useEffect, useState } from 'react'
import {ethers} from 'ethers';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ERC20_ABI, PolygonContractAddress } from '../Constant/Constant';
import { connectWallet, getProvider, getSigner } from './EVMConnect';
import { ESL_ABI, PolygonESLContractAddress } from '../Constant/Constant';

function ExecuteBuy() {
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

  const getLiveBuyOrders = async() => {
    let contractInstance = new ethers.Contract(PolygonESLContractAddress, ESL_ABI, provider);
    
    let openOrders = await contractInstance.buyOrderCount()
    console.log("first order", openOrders.toString())

    for (let i = 0; i < parseInt(openOrders.toString()); i ++) {
      let data = await contractInstance.OpenBuyOrders(i)
      console.log(data)
      setBuyOrdersData((order)=>[...order,data]);
    }
  }

  useEffect(() => {
    if (isConnected) {
      getLiveBuyOrders()

    }
  },[isConnected])
  

  const executeBuyFun = async(index, ord) => {
    
    let erc20ContractInstance = new ethers.Contract(ord.TokenB, ERC20_ABI, signer)
    let decimals = await erc20ContractInstance.decimals();
    decimals = decimals.toString()
    
    // Approving TokensB
    let approveTx = await erc20ContractInstance.approve(PolygonESLContractAddress,(ord.Amount.toString()))
    await approveTx.wait();
    toast.success("Token Approved Successfully!", { position: toast.POSITION.TOP_CENTER, theme: "dark"});
    
    let contractInstance = new ethers.Contract(PolygonESLContractAddress, ESL_ABI, signer);
    let executeOrder = await contractInstance.executeBuyOrder(index)
    toast.success("Order executed Successfully :)", { position: toast.POSITION.TOP_CENTER, theme: "dark"});
  }
  
  return isConnected? (
    <>
      <h2>Buy Orders </h2>
      <br />

      <div>
        {buyOrdersData.map(( ord, index) => (
          <div>
            {ord.TokenA} <br/>
            {ord.TokenB} <br />
            {ord.userAddress} <br />
            {(ord.Amount).toString() / 10**18}

            <button onClick={ () => executeBuyFun(index, ord)}>Buy </button>
          </div>
        ))}
      </div>

      <button onClick={getLiveBuyOrders}>getLiveBuyOrders</button> 

    </>
  ): (<div>
    <button onClick={connectWalletFn}>Connect Wallet</button>
  </div>)
}

export default ExecuteBuy