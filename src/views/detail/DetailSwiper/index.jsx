import React from "react";
import { useLoaderData } from "react-router-dom";
import { Image, Swiper } from "antd-mobile";
import "./index.css";
import { LOCALBASEURL } from "../../../common/constant";

export default function DetailSwiper() {
  const {
    data: {
      data: { data },
    },
  } = useLoaderData();
  const item = data[0];
  const imgs = [...item.mainImage, ...item.subImage];
  const items = imgs.map((url, index) => (
    <Swiper.Item key={index}>
      <Image src={LOCALBASEURL + url} alt={url} />
    </Swiper.Item>
  ));

  return (
    <Swiper autoplay loop className="detail-swiper">
      {items}
    </Swiper>
  );
}
