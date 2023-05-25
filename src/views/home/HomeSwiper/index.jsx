import React from "react";
import { Swiper, Image } from "antd-mobile";
import a from "../../../assets/img/home/a.webp";
import b from "../../../assets/img/home/b.webp";
import c from "../../../assets/img/home/c.webp";
import d from "../../../assets/img/home/d.webp";
import "./index.css";

export default function HomeSwiper() {
  const imgs = [a, b, c, d];
  const items = imgs.map((img, index) => (
    <Swiper.Item key={index}>
      <div className="home-swiper-content">
        <Image height={300} src={img} />
      </div>
    </Swiper.Item>
  ));
  return (
    <Swiper autoplay loop>
      {items}
    </Swiper>
  );
}
