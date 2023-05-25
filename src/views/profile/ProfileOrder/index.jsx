import React, { useEffect, useState } from "react";
import { Badge, Card, Image } from "antd-mobile";
import tobepaid from "../../../assets/img/profile/tobepaid.png";
import tobeshipped from "../../../assets/img/profile/tobeshipped.png";
import tobeevaluated from "../../../assets/img/profile/tobeevaluated.png";
import historicalorders from "../../../assets/img/profile/historicalorders.png";
import "./index.css";
import { getAllOrder } from "../../../network/payment";
import { LOCALSTORAGE } from "../../../common/constant";
import { LocalStorage } from "../../../common/utils";
import { useNavigate } from "react-router-dom";

export default function ProfileOrder(props) {
  const navigate = useNavigate();
  const [tobePaid, setTobePaid] = useState("");
  const [tobeShipped, setTobeShipped] = useState("");
  const [tobeEvaluated, setTobeEvaluated] = useState("");
  const [historicalOrders, setHistoricalOrders] = useState("");
  const userId = LocalStorage.get(LOCALSTORAGE.USER)?.userId;

  useEffect(() => {
    getAllOrder(userId)
      .then(({ data: { data } }) => {
        let open = 0;
        let process = 0;
        let close = 0;
        data.forEach((item) => {
          if (item.status === "open") {
            open++;
          } else if (item.status === "process") {
            process++;
          } else if (item.status === "close") {
            close++;
          }
        });
        setTobePaid(open || "");
        setTobeShipped(process || "");
        setTobeEvaluated("");
        setHistoricalOrders(close || "");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleClick = (e) => {
    if (e.target.className === "profile-order") return;
    let ancestorElement = e.target;
    while (ancestorElement.className !== "profile-order-item") {
      ancestorElement = ancestorElement.parentNode;
    }
    navigate("/order", { state: { index: ancestorElement.dataset.index } });
  };
  return (
    <Card className="profile-myorder" title="我的订单">
      <div className="profile-order" onClick={handleClick}>
        <div className="profile-order-item" data-index="0">
          <Badge content={tobePaid}>
            <Image src={tobepaid} width={36} height={36} />
          </Badge>
          <span>待付款</span>
        </div>
        <div className="profile-order-item" data-index="1">
          <Badge content={tobeShipped}>
            <Image src={tobeshipped} width={36} height={36} />
          </Badge>
          <span>待收货</span>
        </div>
        <div className="profile-order-item" data-index="2">
          <Badge content={tobeEvaluated}>
            <Image src={tobeevaluated} width={36} height={36} />
          </Badge>
          <span>待评价</span>
        </div>
        <div className="profile-order-item" data-index="3">
          <Badge content={historicalOrders}>
            <Image src={historicalorders} width={36} height={36} />
          </Badge>
          <span>历史订单</span>
        </div>
      </div>
    </Card>
  );
}
