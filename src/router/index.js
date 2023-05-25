import { Navigate } from "react-router-dom";
import { ErrorBlock } from "antd-mobile";
import Home from "../views/home";
import Cart from "../views/cart";
import Profile from "../views/profile";
import Register from "../views/register";
import Login from "../views/login";
import Product from "../views/product";
import Detail from "../views/detail";
import MyGoods from "../views/mygoods";
import Collect from "../views/collect";
import Payment from "../views/payment";
import PaymentResult from "../views/paymentresult";

import { getHomeGoods } from "../network/home";
import { getDetailData } from "../network/detail";
import { getMyGoods } from "../network/mygoods";
import { getMyCollect } from "../network/mycollect";
import Order from "../views/order";

const routes = [
  {
    element: <Home />,
    path: "/home",
    loader: () => getHomeGoods(1),
    errorElement: <ErrorBlock />,
  },
  {
    element: <Cart />,
    path: "/cart",
    errorElement: <ErrorBlock />,
  },
  {
    element: <Profile />,
    path: "/profile",
    errorElement: <ErrorBlock />,
  },
  {
    element: <Register />,
    path: "/register",
    errorElement: <ErrorBlock />,
  },
  {
    element: <Login />,
    path: "/login",
    errorElement: <ErrorBlock />,
  },
  {
    element: <Product />,
    path: "/product",
    errorElement: <ErrorBlock />,
  },
  {
    element: <Detail />,
    path: "/detail/:proId",
    loader: (data) => getDetailData(data.params.proId),
    errorElement: <ErrorBlock />,
  },
  {
    element: <MyGoods />,
    path: "/mygoods/:userId",
    loader: (data) => getMyGoods(data.params.userId),
    errorElement: <ErrorBlock />,
  },
  {
    element: <Collect />,
    path: "/collect/:userId",
    loader: (data) => getMyCollect(data.params.userId),
    errorElement: <ErrorBlock />,
  },
  {
    element: <Payment />,
    path: "/payment",
    errorElement: <ErrorBlock />,
  },
  {
    element: <PaymentResult />,
    path: "/paymentresult",
    errorElement: <ErrorBlock />,
  },
  {
    element: <Order />,
    path: "/order",
    errorElement: <ErrorBlock />,
  },
  {
    element: <Navigate to="/home" />,
    path: "*",
    errorElement: <ErrorBlock />,
  },
];

export default routes;
