import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, TabBar } from "antd-mobile";
import { subscribe, unsubscribe } from "pubsub-js";
import "./index.css";

export default function DetailNavBar() {
  const tabs = [
    {
      key: "product",
      title: "商品",
    },
    {
      key: "detail",
      title: "详情",
    },
    {
      key: "imgs",
      title: "图片",
    },
    {
      key: "recommend",
      title: "推荐",
    },
  ];
  const [activeKey, setActiveKey] = useState("product");
  const [top, setTop] = useState([0, 0, 0, 0]);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      if (scrollTop >= top[0] && scrollTop <= top[1] - 1) {
        setActiveKey("product");
      } else if (scrollTop > top[1] - 1 && scrollTop <= top[2] - 1) {
        setActiveKey("detail");
      } else if (scrollTop > top[2] - 1 && scrollTop <= top[3] - 1) {
        setActiveKey("imgs");
      } else if (scrollTop > top[3] - 1) {
        setActiveKey("recommend");
      } else {
        setActiveKey("product");
      }
    };
    subscribe("base-info", (_, data) => {
      // top.current[1] = data - 45
      setTop((top) => [...top.slice(0, 1), data - 45, ...top.slice(2)]);
    });
    subscribe("goods-info", (_, data) => {
      // top.current[2] = data - 45
      setTop((top) => [...top.slice(0, 2), data - 45, ...top.slice(3)]);
    });
    subscribe("recommend", (_, data) => {
      // top.current[3] = data - 45
      setTop((top) => [...top.slice(0, 3), data - 45, ...top.slice(4)]);
    });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      unsubscribe("base-info");
      unsubscribe("goods-info");
      unsubscribe("recommend");
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, [top]);

  const onChange = (e) => {
    let to = 0;
    switch (e) {
      case "product":
        to = top[0];
        setActiveKey("product");
        break;
      case "detail":
        to = top[1];
        setActiveKey("detail");
        break;
      case "imgs":
        to = top[2];
        setActiveKey("imgs");
        break;
      case "recommend":
        to = top[3];
        setActiveKey("recommend");
        break;
      default:
        to = 0;
    }
    window.scrollTo({ top: to });
  };

  const onBack = () => {
    navigate(-1, "replace");
  };

  return (
    <NavBar className="detail-navbar" onBack={onBack}>
      <TabBar
        defaultActiveKey="product"
        activeKey={activeKey}
        className="detail-tabbar"
        onChange={onChange}
      >
        {tabs.map((item) => (
          <TabBar.Item key={item.key} title={item.title} />
        ))}
      </TabBar>
    </NavBar>
  );
}
