import React from "react";
import { useDispatch } from "react-redux";
import { Checkbox, Toast } from "antd-mobile";
import { toggle } from "../../redux/reducers/cartSlice";
import "./index.css";
import { updateChecked } from "../../network/cart";
import { LOCALBASEURL, LOCALSTORAGE } from "../../common/constant";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "../../common/utils";

export default function CartListItem(props) {
  const {
    item: { proId, proName, detail, price, count, mainImage, checked },
  } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (checked) => {
    const userId = LocalStorage.get(LOCALSTORAGE.USER)?.userId;
    if (!userId) {
      Toast.show("请重新登录");
      navigate("/login", "replace");
    } else {
      updateChecked(userId, proId, checked)
        .then(() => {
          dispatch(toggle(JSON.stringify({ proId, checked })));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onClick = () => {
    navigate(`/detail/${proId}`);
  };

  return (
    <div className="cart-list-item">
      <div className="cart-item-selector">
        <Checkbox checked={checked} onChange={onChange} />
      </div>
      <div className="cart-item-img">
        <img src={LOCALBASEURL + mainImage} alt="商品图片" />
      </div>
      <div className="cart-item-info" onClick={onClick}>
        <div className="cart-item-proName">{proName}</div>
        <div className="cart-item-detail">{detail}</div>
        <div className="cart-info-bottom">
          <div className="cart-item-price left">￥{price}</div>
          <div className="cart-item-price right">x{count}</div>
        </div>
      </div>
    </div>
  );
}
