import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stepper, Toast } from "antd-mobile";
import { update } from "../../../redux/reducers/cartSlice";
import { toggle } from "../../../redux/reducers/collectSlice";
import { updateCollect } from "../../../network/detail";
import { updateCart } from "../../../network/detail";
import "./index.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import { LOCALSTORAGE } from "../../../common/constant";
import { Product, LocalStorage } from "../../../common/utils";
import { createOrder } from "../../../network/payment";

export default function DetailBottomBar(props) {
  const {
    data: {
      data: { data },
    },
  } = useLoaderData();
  const { proId, proName, mainImage, price, detail, stock } = data[0];
  const userId = LocalStorage.get(LOCALSTORAGE.USER)?.userId;
  const phone = LocalStorage.get(LOCALSTORAGE.USER)?.phone;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isCollect = useSelector((state) => state.collect.includes(proId));
  const count = useSelector((state) => {
    const item = state.cart.find((item) => item.proId === proId);
    return item ? item.count : 0;
  });
  const [showStepper, setShowStepper] = useState(false);
  const [value, setValue] = useState(count);

  useEffect(() => {
    if (count > 0) {
      setShowStepper(true);
    } else {
      setShowStepper(false);
    }
    setValue(count);
  }, [count]);

  const callServer = () => {
    Toast.show({
      content: (
        <>
          <p>请联系管理员</p>
          <p>QQ:947966296</p>
        </>
      ),
      duration: 5000,
    });
  };

  const toggleCollect = () => {
    if (!userId) {
      Toast.show("请重新登录");
      navigate("/login");
      return;
    }
    updateCollect(userId, proId, !isCollect)
      .then(() => {
        dispatch(toggle(JSON.stringify(proId)));
        isCollect ? Toast.show("已取消收藏") : Toast.show("已收藏");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const enterShop = () => {
    Toast.show("暂未开通店铺");
  };

  const addToCart = (value) => {
    if (!userId) {
      Toast.show("请重新登录");
      navigate("/login");
      return;
    }
    if (value === 0) {
      setShowStepper(false);
    } else {
      setShowStepper(true);
    }
    const product = JSON.stringify(
      new Product(proId, proName, mainImage, price, detail, value)
    );
    updateCart(userId, product)
      .then(() => {
        dispatch(update(product));
        if (value === 0) {
          Toast.show("已从购物车中移除");
        } else {
          Toast.show("已添加入购物车");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const buy = () => {
    if (!userId) {
      Toast.show("请重新登录");
      navigate("/login");
      return;
    }
    const products = new Product(
      proId,
      proName,
      mainImage,
      price,
      detail,
      value || 1
    );

    createOrder(userId, phone, JSON.stringify([products]))
      .then(({ data: { data } }) => {
        navigate("/payment", {
          state: { data: JSON.parse(data.products), orderId: data.orderId },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bottom-bar">
      <div className="bar-item bar-left">
        <div>
          <i className="icon service"></i>
          <span className="text" onClick={callServer}>
            客服
          </span>
        </div>
        <div>
          <i className="icon shop"></i>
          <span className="text" onClick={enterShop}>
            店铺
          </span>
        </div>
        {isCollect ? (
          <div>
            <i className="icon active"></i>
            <span className="text active" onClick={toggleCollect}>
              已收藏
            </span>
          </div>
        ) : (
          <div>
            <i className="icon"></i>
            <span className="text" onClick={toggleCollect}>
              收藏
            </span>
          </div>
        )}
      </div>
      <div className="bar-item bar-right">
        <div className="detail-bar-right-cart">
          {showStepper ? (
            <Stepper
              value={value}
              inputReadOnly
              min={0}
              max={stock}
              onChange={addToCart}
            />
          ) : (
            <span onClick={() => addToCart(1)}>加入购物车</span>
          )}
        </div>
        <div className="buy" onClick={buy}>
          购买
        </div>
      </div>
    </div>
  );
}
