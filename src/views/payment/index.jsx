import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  Image,
  List,
  NavBar,
  Button,
  Popup,
  InfiniteScroll,
  PullToRefresh,
  Toast,
} from "antd-mobile";
import "./index.css";
import { useLocation, useNavigate } from "react-router-dom";
import { LOCALBASEURL, LOCALSTORAGE } from "../../common/constant";
import { LocalStorage } from "../../common/utils";
import { closeOrder, getOneOrder, updateOrder } from "../../network/payment";

export default function Payment() {
  const [visible, setVisible] = useState(false);
  const [popupvisible, setPopupvisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [disabledDelivery, setDisabledDelivery] = useState(false);
  const [display, setDisplay] = useState("block");
  const navigate = useNavigate();
  const location = useLocation();
  const goods = location.state.data;
  const orderId = location.state.orderId;
  const userId = LocalStorage.get(LOCALSTORAGE.USER)?.userId;
  const username = LocalStorage.get(LOCALSTORAGE.USER)?.username;
  const phone = LocalStorage.get(LOCALSTORAGE.USER)?.phone;
  if (!userId || !username || !phone) {
    Toast.show("请重新登录");
    navigate("/login");
  }

  const getOrder = () => {
    getOneOrder(userId, orderId)
      .then(({ data: { data } }) => {
        if (data) {
          const status = data[0].status;
          if (status === "open") {
            setDisabled(false);
            setDisabledDelivery(true);
            setDisplay("none");
          } else if (status === "process") {
            setDisabled(true);
            setDisabledDelivery(false);
            setDisplay("block");
          } else if (status === "close") {
            setDisabled(true);
            setDisabledDelivery(true);
            setDisplay("block");
          }
        } else {
          setDisabled(true);
          setDisabledDelivery(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOrder();
  });

  const onRefresh = () => {
    getOrder();
  };

  const totalPrice = useMemo(() => {
    return goods.reduce((price, item) => {
      return price + item.price * item.count;
    }, 0);
  }, [goods]);

  const onBack = () => {
    navigate(-1);
  };

  const onSubmit = () => {
    const payment = totalPrice;
    updateOrder(userId, orderId, payment)
      .then(({ data }) => {
        setVisible(false);
        navigate("/paymentresult", { state: { data, username, phone } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDeliveryClick = () => {
    closeOrder(userId, orderId)
      .then(({ data }) => {
        setPopupvisible(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="payment">
      <PullToRefresh onRefresh={onRefresh}>
        <NavBar onBack={onBack} className="payment-navbar">
          确认订单
        </NavBar>
        <Card className="payment-card">
          <List className="payment-userinfo">
            <List.Item title="昵称：" extra={username} />
            <List.Item title="电话号码：" extra={phone} />
          </List>
        </Card>
        <Card className="payment-card">
          <List className="payment-list">
            {goods.map((item, index) => {
              return (
                <List.Item
                  key={index}
                  prefix={
                    <Image
                      src={LOCALBASEURL + item.mainImage[0]}
                      fit="cover"
                      width={100}
                      height={100}
                    />
                  }
                  title={item.proName}
                  children={"x " + item.count}
                  extra={"￥ " + item.price * item.count}
                />
              );
            })}
          </List>
        </Card>
        <div className="payment-bottom-bar">
          <Button
            style={{ display: display }}
            disabled={disabledDelivery}
            color="primary"
            shape="rounded"
            className="payment-button"
            onClick={() => setPopupvisible(true)}
          >
            {disabledDelivery ? "已收货" : "确认收货"}
          </Button>
          <div className="payment-total">合计 ￥{totalPrice.toFixed(2)}</div>
          <Button
            disabled={disabled}
            className="payment-button"
            color="primary"
            shape="rounded"
            onClick={() => setVisible(true)}
          >
            {disabled ? "已提交" : "提交订单"}
          </Button>
          <Popup
            visible={popupvisible}
            onMaskClick={() => {
              setPopupvisible(false);
            }}
            bodyStyle={{
              height: "15vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              color="primary"
              shape="rounded"
              className="payment-check-button"
              onClick={onDeliveryClick}
            >
              确认收货
            </Button>
          </Popup>
          <Popup
            visible={visible}
            onMaskClick={() => {
              setVisible(false);
            }}
            bodyStyle={{
              height: "50vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <div className="payment-price">￥{totalPrice.toFixed(2)}</div>
            <List className="payment-popup-list">
              <List.Item title="昵称" extra={username} />
              <List.Item title="手机号" extra={phone} />
              <List.Item title="付款方式" extra={"online"} />
            </List>
            <Button
              color="primary"
              shape="rounded"
              className="payment-check-button"
              onClick={onSubmit}
            >
              确认
            </Button>
          </Popup>
        </div>
        <InfiniteScroll className="payment-scroll" />
      </PullToRefresh>
    </div>
  );
}
