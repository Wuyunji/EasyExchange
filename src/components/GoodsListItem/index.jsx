import React from "react";
import { Image } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { LOCALBASEURL } from "../../common/constant";
import "./index.css";

export default function GoodsListItem(props) {
  const { item = {} } = props;
  const { proId, proName, price, collect, mainImage } = item;
  const { onLoad = null } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${proId}`);
  };

  return (
    <div className="goods-item" onClick={handleClick}>
      <Image src={LOCALBASEURL + mainImage[0]} alt="图片" onLoad={onLoad} />
      <div className="goods-info">
        <p>{proName}</p>
        <span className="price">￥{price.toFixed(2)}</span>
        <span className="collect">{collect.length}</span>
      </div>
    </div>
  );
}
