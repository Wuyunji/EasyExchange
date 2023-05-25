import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import {
  InfiniteScroll,
  NavBar,
  PullToRefresh,
  Swiper,
  Tabs,
} from "antd-mobile";
import { useLocation, useNavigate } from "react-router-dom";
import { LOCALSTORAGE } from "../../common/constant";
import { getAllOrder } from "../../network/payment";
import { LocalStorage } from "../../common/utils";
import MyOrderList from "./MyOrderList";

const titles = ["待付款", "待收货", "待评价", "历史订单"];
const keys = ["tobepaid", "tobeshipped", "tobeevaluated", "history"];
const tabItems = titles.map((title, index) => {
  return {
    title,
    key: keys[index],
  };
});

export default function Order() {
  const navigate = useNavigate();
  const location = useLocation();
  const swiperRef = useRef(null);

  const { index } = location.state;
  const [orderData, setOrderData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(index);

  useEffect(() => {
    const userId = LocalStorage.get(LOCALSTORAGE.USER).userId;
    getAllOrder(userId).then(({ data: { data } }) => {
      const open = [];
      const process = [];
      const close = [];
      data.forEach((item) => {
        if (item.status === "open") {
          open.push(item);
        } else if (item.status === "process") {
          process.push(item);
        } else if (item.status === "close") {
          close.push(item);
        }
      });
      setOrderData([open, process, [], close]);
    });
  }, []);

  const onBack = () => {
    navigate(-1);
  };

  return (
    <div className="order">
      <NavBar onBack={onBack} className="order-navbar">
        我的订单
      </NavBar>
      <Tabs
        activeKey={tabItems[activeIndex].key}
        onChange={(key) => {
          const index = tabItems.findIndex((item) => item.key === key);
          setActiveIndex(index);
          swiperRef.current?.swipeTo(index);
        }}
        className="order-tabs"
      >
        {tabItems.map((item) => (
          <Tabs.Tab title={item.title} key={item.key} />
        ))}
      </Tabs>
      {orderData.length > 0 ? (
        <Swiper
          className="order-swiper"
          direction="horizontal"
          loop
          indicator={() => null}
          ref={swiperRef}
          defaultIndex={activeIndex}
          onIndexChange={(index) => {
            setActiveIndex(index);
          }}
        >
          {orderData.map((goods, index) => {
            return (
              <Swiper.Item className="order-swiper-content" key={index}>
                <PullToRefresh>
                  <MyOrderList goods={goods} />
                  <InfiniteScroll />
                </PullToRefresh>
              </Swiper.Item>
            );
          })}
        </Swiper>
      ) : null}
    </div>
  );
}
