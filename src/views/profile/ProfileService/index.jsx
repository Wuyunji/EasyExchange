import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, List } from "antd-mobile";
import "./index.css";

export default function ProfileService(props) {
  const navigate = useNavigate();
  const { userInfo } = props;
  const [userId, setUserId] = useState(userInfo.userId);
  const collectLength = useSelector((state) => state.collect.length);

  useEffect(() => {
    setUserId(userInfo.userId);
  }, [userInfo.userId]);

  const showMyGoods = () => {
    navigate(`/mygoods/${userId}`);
  };

  const showMyCollect = () => {
    navigate(`/collect/${userId}`);
  };

  const uploadGoods = () => {
    navigate("/product");
  };

  return (
    <Card className="profile-service" title="我的服务">
      <List className="profile-list">
        <List.Item prefix={null} onClick={showMyGoods}>
          我的商品
        </List.Item>
        <List.Item prefix={null} onClick={showMyCollect}>
          我的收藏<i className="profile-collect">({collectLength})</i>
        </List.Item>
        <List.Item prefix={null} onClick={uploadGoods}>
          上传物品
        </List.Item>
      </List>
    </Card>
  );
}
