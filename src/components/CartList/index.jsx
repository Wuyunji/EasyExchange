import React from "react";
import CartListItem from "../CartListItem";
import "./index.css";
import { Dialog, SwipeAction, Toast } from "antd-mobile";
import { deleteCartByProId } from "../../network/cart";
import { LocalStorage } from "../../common/utils";
import { LOCALSTORAGE } from "../../common/constant";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { remove } from "../../redux/reducers/cartSlice";

export default function CartList(props) {
  const { goods } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setRightActions = (index) => {
    return [
      {
        key: "delete",
        text: "删除",
        color: "danger",
        onClick: async (e) => {
          const isDelete = await Dialog.confirm({
            content: "确定要删除吗？",
          });
          if (!isDelete) return;
          const userId = LocalStorage.get(LOCALSTORAGE.USER)?.userId;
          const proId = goods[index].proId;
          if (!userId) {
            Toast.show("请重新登录");
            navigate("/login");
          }
          deleteCartByProId(userId, proId)
            .then(
              ({
                data: {
                  data: { data },
                },
              }) => {
                dispatch(remove(JSON.stringify(proId)));
              }
            )
            .catch((err) => {
              console.log(err);
            });
        },
      },
    ];
  };
  return (
    <div className="cart-list">
      {goods?.map((item, index) => {
        return (
          <SwipeAction rightActions={setRightActions(index)} key={index}>
            <CartListItem item={item} key={index} />
          </SwipeAction>
        );
      })}
    </div>
  );
}
