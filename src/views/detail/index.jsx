import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { InfiniteScroll, PullToRefresh } from "antd-mobile";
import DetailNavBar from "./DetailNavBar";
import DetailSwiper from "./DetailSwiper";
import DetailBaseInfo from "./DetailBaseInfo";
import DetailShopInfo from "./DetailShopInfo";
import DetailGoodsInfo from "./DetailGoodsInfo";
import DetailBottomBar from "./DetailBottomBar";
import DetailRecommend from "./DetailRecommend";
import { getDetailRecommend } from "../../network/detail";
import "./index.css";

export default function Detail() {
  const {
    data: {
      data: { data },
    },
  } = useLoaderData();
  const [goods, setGoods] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const keyword = data[0].proName;

  const onRefresh = () => {
    setHasMore(true);
    setGoods([]);
  };

  const loadMore = async () => {
    const {
      data: {
        data: { data: data_1 },
      },
    } = await getDetailRecommend(page, keyword);
    setPage((page) => page + 1);
    setHasMore(data_1.length > 0);
    setGoods((val) => [...val, ...data_1]);
  };

  return (
    <div className="detail">
      <PullToRefresh onRefresh={onRefresh}>
        <DetailNavBar />
        <DetailSwiper />
        <DetailBaseInfo />
        <DetailShopInfo />
        <DetailGoodsInfo />
        <DetailRecommend goods={goods} />
        <InfiniteScroll
          className="detail-scroll"
          hasMore={hasMore}
          loadMore={loadMore}
        />
      </PullToRefresh>
      <DetailBottomBar />
    </div>
  );
}
