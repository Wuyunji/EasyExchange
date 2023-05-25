import React, { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { publish } from "pubsub-js";
import "./index.css";

export default function DetailBaseInfo() {
  const ref = useRef();
  const {
    data: {
      data: { data },
    },
  } = useLoaderData();
  const item = data[0];

  useEffect(() => {
    publish("base-info", ref.current?.offsetTop);
  }, []);

  return (
    <div className="base-info" ref={ref}>
      <div className="info-title">{item.proName}</div>
      <div className="info-price">
        <span className="n-price">￥{item.price.toFixed(2)}</span>
      </div>
      <div className="info-other">
        <span>库存 {item.stock}</span>
        <span>收藏 {item.collect.length}</span>
        <span>72小时发货</span>
      </div>
    </div>
  );
}
