import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, NavBar, PullToRefresh, Toast } from "antd-mobile";
import ProfileBasicInfo from "./ProfileBasicInfo";
import ProfileOrder from "./ProfileOrder";
import ProfileService from "./ProfileService";
import MainTabBar from "../../components/MainTabBar";
import "./index.css";
import { MoreOutline } from "antd-mobile-icons";
import { set } from "../../redux/reducers/authSlice";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/reducers/cartSlice";
import { clearCollect } from "../../redux/reducers/collectSlice";
import { getUserInfo, logout } from "../../network/profile";
import { LOCALSTORAGE } from "../../common/constant";
import { LocalStorage } from "../../common/utils";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const userId = LocalStorage.get(LOCALSTORAGE.USER)?.userId;

  const onClick = () => {
    logout(userId)
      .then(() => {
        // 修改用户在redux中的状态
        dispatch(set(false));
        // 清空购物车
        dispatch(clearCart());
        // 清空收藏
        dispatch(clearCollect());
        // 删除用户信息
        LocalStorage.remove(LOCALSTORAGE.USER);
        Toast.show("账号已成功退出");
        setTimeout(() => {
          navigate("/login", "replace");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        Toast.show("账号退出失败");
      });
  };

  const right = (
    <Dropdown className="profile-right">
      <Dropdown.Item
        key="out"
        arrow={<MoreOutline />}
        className="profile-right-arrow"
      >
        <div style={{ padding: 12 }} onClick={onClick}>
          退出账号
        </div>
      </Dropdown.Item>
    </Dropdown>
  );

  useEffect(() => {
    if (userId) {
      getUserInfo(userId).then(
        ({
          data: {
            data: { data },
          },
        }) => {
          data.userId = userId;
          setUserInfo(data);
        }
      );
    } else {
      Toast.show("请重新登录");
      navigate("/login", "replace");
    }
  }, [navigate, userId]);

  return (
    <PullToRefresh>
      <div className="profile">
        <NavBar back={null} right={right} className="profile-navbar">
          EasyExchange
        </NavBar>
        <ProfileBasicInfo userInfo={userInfo} />
        <ProfileOrder />
        <ProfileService userInfo={userInfo} />
      </div>
      <MainTabBar />
    </PullToRefresh>
  );
}
