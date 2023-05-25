import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavBar, InfiniteScroll, PullToRefresh } from "antd-mobile";
import CartList from "../../components/CartList";
import CartBottomBar from "./CartBotomBar";
import MainTabBar from "../../components/MainTabBar";
import "./index.css";

export default function Cart() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const onBack = () => {
    navigate("/home");
  };

  return (
    <div className="cart">
      <PullToRefresh>
        <NavBar className="cart-nav-bar" onBack={onBack}>
          购物车({cart.length})
        </NavBar>
        <CartList goods={cart} />
        <CartBottomBar />
        <InfiniteScroll className="cart-scroll" />
      </PullToRefresh>
      <MainTabBar />
    </div>
  );
}
