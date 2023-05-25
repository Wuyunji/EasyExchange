import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Toast } from "antd-mobile";
import { toggle } from "../../../redux/reducers/cartSlice";
import "./index.css";
import { LOCALSTORAGE } from "../../../common/constant";
import { useNavigate } from "react-router-dom";
import { batchUpdateChecked } from "../../../network/cart";
import { LocalStorage } from "../../../common/utils";
import { createOrder } from "../../../network/payment";

export default function CartBottomBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const { checkedLength, totalPrice } = useMemo(() => {
    let checkedLength = 0;
    let totalPrice = 0;
    cart.forEach((item) => {
      if (item.checked) {
        checkedLength += 1;
        totalPrice += item.price * item.count;
      }
    });
    return { checkedLength, totalPrice };
  }, [cart]);

  const onChange = () => {
    if (!cart.length) return;
    const userId = LocalStorage.get(LOCALSTORAGE.USER)?.userId;
    if (!userId) {
      Toast.show("请重新登录");
      navigate("/login", "replace");
    } else {
      const checked = checkedLength >= 0 && checkedLength < cart.length;
      batchUpdateChecked(userId, checked)
        .then(() => {
          cart.forEach((item) => {
            dispatch(toggle(JSON.stringify({ proId: item.proId, checked })));
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const buy = () => {
    const data = cart.filter((item) => item.checked);
    if (!data.length) return;
    const userId = LocalStorage.get(LOCALSTORAGE.USER)?.userId;
    const phone = LocalStorage.get(LOCALSTORAGE.USER)?.phone;
    const products = cart.filter((item) => item.checked);

    if (!userId) {
      Toast.show("请重新登录");
      navigate("/login", "replace");
    } else {
      createOrder(userId, phone, JSON.stringify(products))
        .then(({ data: { data } }) => {
          navigate("/payment", {
            state: { data: JSON.parse(data.products), orderId: data.orderId },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="cart-bottom-bar">
      <div className="cart-checkbox">
        <Checkbox
          indeterminate={checkedLength > 0 && checkedLength < cart.length}
          checked={cart.length > 0 && checkedLength === cart.length}
          onChange={onChange}
        >
          全选
        </Checkbox>
      </div>
      <div className="cart-total-price">合计: ￥{totalPrice.toFixed(2)}</div>
      <div className="cart-calculate" onClick={buy}>
        去结算: {checkedLength}
      </div>
    </div>
  );
}
