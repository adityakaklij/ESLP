import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connectWallet, getSigner } from "./EVMConnect";
import {
  ERC20_ABI,
  ESL_ABI,
  PolygonContractAddress,
  PolygonESLContractAddress,
} from "../Constant/Constant";
import { ethers } from "ethers";
import "../css/CreateOrder.css";
import swap from '../assets/swap.png'

/**
 * ✅ Connect With metamask
 * deploy Smart Contract (Account 3) 0x8B1Ac70dF35Ce470f73416051fA0e673E73D9277
 * Approve the selected token
 * Complete the transaction
 * Alert library
 *
 */

function CreateOrder() {
  const [tokenA, setTokenA] = useState();
  const [tokenB, setTokenB] = useState();
  const [tokenPrice, setTokenPrice] = useState(100);
  const [tokenAmount, setTokenAmount] = useState();

  // It's a Sell Order.
  // User Have USDT, Person creates sell order, sells USDT
  const createBuyOrder = async () => {
    const connect = await connectWallet();
    const signer = await getSigner();
    let erc20ContractInstance = new ethers.Contract(
      PolygonContractAddress[tokenA],
      ERC20_ABI,
      signer
    );
    let decimals = await erc20ContractInstance.decimals();
    decimals = decimals.toString();

    // Approving Tokens
    let approveTx = await erc20ContractInstance.approve(
      PolygonESLContractAddress,
      ((tokenAmount * 10 ** decimals * (tokenPrice * 100)) / 100).toString()
    );
    await approveTx.wait();
    toast.success("Token approved Successfully!", {
      position: toast.POSITION.TOP_CENTER,
      theme: "dark",
    });

    // Sending tokens to contract.
    let ESLContractInstance = new ethers.Contract(
      PolygonESLContractAddress,
      ESL_ABI,
      signer
    );
    let CreateBuyTx = await ESLContractInstance.createBuyOrder(
      PolygonContractAddress[tokenA],
      PolygonContractAddress[tokenB],
      ((tokenAmount * 10 ** decimals * (tokenPrice * 100)) / 100).toString(),
      tokenPrice * 100
    );
    await CreateBuyTx.wait();
    toast.success("Buy Order Creaed Successfully!", {
      position: toast.POSITION.TOP_CENTER,
      theme: "dark",
    });
  };

  const createSellOrder = async () => {
    const connect = await connectWallet();
    const signer = await getSigner();

    let erc20ContractInstance = new ethers.Contract(
      PolygonContractAddress[tokenA],
      ERC20_ABI,
      signer
    );
    let decimals = await erc20ContractInstance.decimals();
    decimals = decimals.toString();

    // Approving Tokens
    let approveTx = await erc20ContractInstance.approve(
      PolygonESLContractAddress,
      ((tokenAmount * 10 ** decimals * (tokenPrice * 100)) / 100).toString()
    );
    await approveTx.wait();
    toast.success("Token approved Successfully!", {
      position: toast.POSITION.TOP_CENTER,
      theme: "dark",
    });

    // Sending tokens to contract.
    let ESLContractInstance = new ethers.Contract(
      PolygonESLContractAddress,
      ESL_ABI,
      signer
    );
    let CreateBuyTx = await ESLContractInstance.createSellOrder(
      PolygonContractAddress[tokenA],
      PolygonContractAddress[tokenB],
      ((tokenAmount * 10 ** decimals * (tokenPrice * 100)) / 100).toString(),
      tokenPrice * 100
    );
    await CreateBuyTx.wait();
    toast.success("Sell Order Creaed Successfully!", {
      position: toast.POSITION.TOP_CENTER,
      theme: "dark",
    });
  };

  // Helper function
  function handelTokenAChange(e) {
    setTokenA(e.target.value);
    console.log(typeof e.target.value);
  }
  function handelTokenBChange(e) {
    setTokenB(e.target.value);
  }
  function handelTokenAmount(e) {
    setTokenAmount(e.target.value);
  }
  function handelTokenPrice(e) {
    setTokenPrice(e.target.value);
  }

  return (
    <>
      {/* <button onClick={test}>Toast test</button> */}

      <div className="create-order">
        <div className="form-container">
          <div className="form">
             <div className="heading">
              <span>Create Order</span>
             </div>
             <div class="button b2" id="button-10">
          <input type="checkbox" class="checkbox" />
          <div class="knobs">
            <span>BUY</span>
          </div>
          <div class="layer"></div>
        </div>
            <div className="inputGroup first">
              <input
                onChange={handelTokenAmount}
                type="number"
                placeholder="Enter Amount of tokens"
                className="inpt"
              />
              <div className="swap-logo">
                <img src={swap} alt="" />
              </div>
              <input
                onChange={handelTokenPrice}
                type="number"
                placeholder="Enter Price"
                className="inpt"
              />
            </div>
            <div className="inputGroup">
              <div className="select-group">
                <select name="" id="" onChange={handelTokenAChange} className="cutome-select">
                  <option value="One">Select token</option>
                  <option value="USDT" data-thumbnail="https://glot.io/static/img/c.svg?etag=ZaoLBh_p">USDT</option>
                  <option value="USDC"><img src={swap} alt="" />USDC</option>
                  <option value="DAI">DAI</option>
                </select>

                <select name="" id="" onChange={handelTokenBChange} className="cutome-select">
                  <option value="One">Select token</option>
                  <option value="USDT">USDT</option>
                  <option value="USDC">USDC</option>
                  <option value="DAI">DAI</option>
                </select>
              </div>
            </div>
            <div className="inputGroup">
              <button onClick={createBuyOrder} className="custome-btn ">Create</button>
              {/* <button onClick={createSellOrder} className="custome-btn btn-15">Create Sell Order</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateOrder;
