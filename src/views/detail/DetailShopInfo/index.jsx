import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getShopData } from "../../../network/detail";
import "./index.css";
import { Toast } from "antd-mobile";
import { LOCALBASEURL } from "../../../common/constant";

export default function DetailShopInfo() {
  const {
    data: {
      data: { data },
    },
  } = useLoaderData();

  const [collectCount, setCollectCount] = useState(0);
  const [goodsCount, setGoodsCount] = useState(0);
  const [avatar, setAvatar] = useState(null);
  const [shopName, setShopName] = useState("");
  const userId = data[0].owner;

  const onClick = () => {
    Toast.show("暂未开发");
  };

  useEffect(() => {
    getShopData(userId).then(
      ({
        data: {
          data: { data },
        },
      }) => {
        setCollectCount(data.collectCount);
        setGoodsCount(data.goodsCount);
        setAvatar(data.avatar);
        setShopName(data.username);
      }
    );
  }, [userId]);

  return (
    <div className="shop-info">
      <div className="shop-top">
        <img src={avatar ? LOCALBASEURL + avatar : ""} alt="头像" />
        <span className="title">{shopName}</span>
      </div>
      <div className="shop-middle">
        <div className="shop-middle-item">
          <div className="info-sells">
            <div className="sells-count">{collectCount}</div>
            <div className="sells-text">总收藏</div>
          </div>
          <div className="info-goods">
            <div className="goods-count">{goodsCount}</div>
            <div className="goods-text">全部宝贝</div>
          </div>
        </div>
      </div>
      <div className="shop-bottom">
        <div className="enter-shop" onClick={onClick}>
          进店逛逛
        </div>
      </div>
    </div>
  );
}
