import { publish } from "pubsub-js";
import React, { useEffect, useRef } from "react";
import GoodsList from "../../../components/GoodsList";
import "./index.css";

export default function DetailRecommend(props) {
  const { goods } = props;
  const ref = useRef();

  useEffect(() => {
    publish("recommend", ref.current?.offsetTop);
  });

  return (
    <div ref={ref}>
      <div className="detail-recommend-title">推荐列表</div>
      <GoodsList goods={goods} />
    </div>
  );
}
