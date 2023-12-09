import React, { useState } from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connectWallet, getSigner } from './EVMConnect';
import { ERC20_ABI, ESL_ABI, PolygonContractAddress, PolygonESLContractAddress } from '../Constant/Constant';
import {ethers} from 'ethers';

/**
 * ✅ Connect With metamask
 * deploy Smart Contract (Account 3) 0x8B1Ac70dF35Ce470f73416051fA0e673E73D9277
 * Approve the selected token 
 * Complete the transaction
 * Alert library
 * 
 */


function CreateOrder() {

  const [tokenA, setTokenA] = useState()
  const [tokenB, setTokenB] = useState()
  const [tokenPrice, setTokenPrice] = useState(100)
  const [tokenAmount, setTokenAmount] = useState()


  // It's a Sell Order. 
  // User Have USDT, Person creates sell order, sells USDT
  const createBuyOrder = async () => {

    const connect = await connectWallet();
    const signer = await getSigner()
    let erc20ContractInstance = new ethers.Contract(PolygonContractAddress[tokenA], ERC20_ABI, signer)
    let decimals = await erc20ContractInstance.decimals();
    decimals = decimals.toString()
    
    // Approving Tokens
    let approveTx = await erc20ContractInstance.approve(PolygonESLContractAddress,((tokenAmount * 10 ** decimals) * (tokenPrice * 100) / 100).toString())
    await approveTx.wait();
    toast.success("Token approved Successfully!", { position: toast.POSITION.TOP_CENTER, theme: "dark"});
    
    // Sending tokens to contract.
    let ESLContractInstance = new ethers.Contract(PolygonESLContractAddress, ESL_ABI, signer);
    let CreateBuyTx = await ESLContractInstance.createBuyOrder(PolygonContractAddress[tokenA], PolygonContractAddress[tokenB], ((tokenAmount * 10 ** decimals) * (tokenPrice * 100) / 100).toString(), tokenPrice* 100);
    await CreateBuyTx.wait();
    toast.success("Buy Order Creaed Successfully!", { position: toast.POSITION.TOP_CENTER, theme: "dark"});

  }

  const createSellOrder = async() => {

    const connect = await connectWallet();
    const signer = await getSigner()

    let erc20ContractInstance = new ethers.Contract(PolygonContractAddress[tokenA], ERC20_ABI, signer)
    let decimals = await erc20ContractInstance.decimals();
    decimals = decimals.toString()
    
    // Approving Tokens
    let approveTx = await erc20ContractInstance.approve(PolygonESLContractAddress,((tokenAmount * 10 ** decimals) * (tokenPrice * 100) / 100).toString())
    await approveTx.wait();
    toast.success("Token approved Successfully!", { position: toast.POSITION.TOP_CENTER, theme: "dark"});
    
    // Sending tokens to contract.
    let ESLContractInstance = new ethers.Contract(PolygonESLContractAddress, ESL_ABI, signer);
    let CreateBuyTx = await ESLContractInstance.createSellOrder(PolygonContractAddress[tokenA], PolygonContractAddress[tokenB], ((tokenAmount * 10 ** decimals) * (tokenPrice * 100) / 100).toString(), tokenPrice* 100);
    await CreateBuyTx.wait();
    toast.success("Sell Order Creaed Successfully!", { position: toast.POSITION.TOP_CENTER, theme: "dark"});

  }



// Helper function
function handelTokenAChange(e) {
  setTokenA(e.target.value)
  console.log(typeof(e.target.value))
}
function handelTokenBChange(e) {
  setTokenB(e.target.value)
}
function handelTokenAmount(e) {
  setTokenAmount(e.target.value)
}
function handelTokenPrice(e) {
  setTokenPrice(e.target.value)
}



  return (
    <>
      {/* <button onClick={test}>Toast test</button> */}

      <div className="createBuy">
        <input onChange={handelTokenAmount} type="number" placeholder='Enter Amount of tokens' />
        <input onChange={handelTokenPrice} type="number" placeholder='Enter Price' />

        <div>
          <select name="" id="" onChange={handelTokenAChange}>
            <option value="One">Select token</option>
            <option value="USDT">USDT</option>
            <option value="USDC">USDC</option>
            <option value="DAI">DAI</option>
          </select>

          <select name="" id="" onChange={handelTokenBChange}>
            <option value="One">Select token</option>
            <option value="USDT">USDT</option>
            <option value="USDC">USDC</option>
            <option value="DAI">DAI</option>
          </select>
        </div>


        <button onClick={createBuyOrder}>createBuyOrder</button>
        <button onClick={createSellOrder}>createSellOrder</button>

      </div>
    </>
  )
}

export default CreateOrder