import React from "react";
import "../css/Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="left">
        <div className="buy btnp" onClick={()=>{navigate('/buy-orders')}}>
          <span>Buy</span>
        </div>
        <div className="sell btnp" onClick={()=>{navigate('/sell-orders')}}>
          <span>Sell</span>
        </div>
      </div>
      <div className="right">
        <div className="create-order-btn btnp"  onClick={()=>{navigate('/create-order')}}>
          <span>Create Order</span>
        </div>
      </div>
    </div>
  );
}
