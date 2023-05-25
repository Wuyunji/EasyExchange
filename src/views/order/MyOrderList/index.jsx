import React from "react";
import "./index.css";
import { Card, Image, List } from "antd-mobile";
import { LOCALBASEURL } from "../../../common/constant";
import { formatDate } from "../../../common/utils";
import { useNavigate } from "react-router-dom";

const parseTime = (date) => {
  return formatDate(new Date(date), "MM.dd hh:mm:ss");
};

export default function MyOrderList(props) {
  const { goods } = props;
  const navigate = useNavigate();
  const onClick = (data, orderId) => {
    navigate("/payment", { state: { data, orderId } });
  };
  return goods.length > 0 ? (
    <Card className="order-card">
      <List className="order-list" mode="card">
        {goods.map((item, index) => {
          const products = JSON.parse(item.products);
          return (
            <List.Item
              className="order-list-item"
              key={index}
              prefix={
                <Image
                  src={LOCALBASEURL + products[0].mainImage[0]}
                  fit="cover"
                  width={100}
                  height={100}
                />
              }
              title={"创建时间 " + parseTime(item.createTime)}
              children={
                <div>
                  <p>{products[0].proName}</p>
                  <p>{" x " + products[0].count}</p>
                  <p>{"￥" + products[0].price * products[0].count}</p>
                </div>
              }
              onClick={() => {
                onClick(products, item.orderId);
              }}
            />
          );
        })}
      </List>
    </Card>
  ) : null;
}
