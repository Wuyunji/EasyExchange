import React from "react";
import GoodsListItem from "../GoodsListItem";
import "./index.css";

export default function GoodsList(props) {
  const { goods = [] } = props;
  const { onLoad } = props;

  return (
    <div className="goods">
      {goods.map((item) => {
        return <GoodsListItem key={item._id} item={item} onLoad={onLoad} />;
      })}
    </div>
  );
}
