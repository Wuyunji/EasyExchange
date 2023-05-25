import React, { useRef } from "react";
import { List, Image } from "antd-mobile";
import { useLoaderData } from "react-router-dom";
import { publish } from "pubsub-js";
import "./index.css";
import { LOCALBASEURL } from "../../../common/constant";

export default function DetailGoodsInfo() {
  const {
    data: {
      data: { data },
    },
  } = useLoaderData();
  const ref = useRef();
  const item = data[0];
  const imgs = [...item.mainImage, ...item.subImage];

  const onLoad = () => {
    publish("goods-info", ref.current?.offsetTop + 100);
  };

  return (
    <div className="detail-goods-info" ref={ref}>
      <div className="info-desc">
        <div className="start"></div>
        <div className="desc">{item.detail}</div>
        <div className="end"></div>
      </div>
      <List header="商家图片展示">
        {imgs.map((item, index) => {
          return (
            <List.Item key={index}>
              <Image src={LOCALBASEURL + item} onLoad={onLoad} />
            </List.Item>
          );
        })}
      </List>
    </div>
  );
}
