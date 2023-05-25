import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TabBar } from "antd-mobile";
import { AppOutline, UserOutline } from "antd-mobile-icons";
import CartOutline from "./CartOutline";
import "./index.css";

export default function MainTabBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value) => {
    navigate(value, "replace");
  };

  const tabs = [
    {
      key: "/home",
      title: "首页",
      icon: <AppOutline />,
    },
    {
      key: "/cart",
      title: "购物车",
      icon: <CartOutline />,
    },
    {
      key: `/profile`,
      title: "我的",
      icon: <UserOutline />,
    },
  ];

  return (
    <div className="main-tab-bar">
      <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
}
