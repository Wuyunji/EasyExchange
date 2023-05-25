import React, { useState } from "react";
import { NavBar, PullToRefresh, InfiniteScroll } from "antd-mobile";
import MyCollectList from "./MyCollectList";
import "./index.css";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function Collect() {
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
    <div className="my-collect">
      <PullToRefresh onRefresh={onRefresh}>
        <NavBar onBack={onBack} className="my-collect-navbar">
          我的收藏
        </NavBar>
        <MyCollectList goods={goods} />
        <InfiniteScroll
          className="my-collect-scroll"
          hasMore={hasMore}
          loadMore={loadMore}
        />
      </PullToRefresh>
    </div>
  );
}
