import React, { useState } from "react";
import { NavBar, PullToRefresh, InfiniteScroll } from "antd-mobile";
import MyGoodsList from "./MyGoodsList";
import "./index.css";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function MyGoods() {
  const {
    data: {
      data: { data },
    },
  } = useLoaderData();

  const navigate = useNavigate();

  const [goods, setGoods] = useState(data);
  const [hasMore, setHasMore] = useState(true);

  const onBack = () => {
    navigate(-1, "replace");
  };

  const onRefresh = () => {
    setHasMore(true);
    setGoods(data);
  };

  const loadMore = () => {
    setHasMore(false);
  };

  return (
    <div className="my-goods">
      <PullToRefresh onRefresh={onRefresh}>
        <NavBar onBack={onBack} className="my-goods-navbar">
          我的商品
        </NavBar>
        <MyGoodsList goods={goods} />
        <InfiniteScroll
          className="my-goods-scroll"
          hasMore={hasMore}
          loadMore={loadMore}
        />
      </PullToRefresh>
    </div>
  );
}
