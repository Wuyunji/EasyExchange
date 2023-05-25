import { ResultPage } from "antd-mobile";
import React from "react";
import "./index.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data: {
      data: { status, payment, message },
    },
    username,
    phone,
  } = location.state;

  const details = [
    {
      label: "付款人",
      value: username,
      bold: true,
    },
    {
      label: "手机号",
      value: phone,
    },
    {
      label: "支付金额",
      value: "¥" + payment || 0,
    },
    {
      label: "支付方式",
      value: "online",
    },
  ];

  return (
    <ResultPage
      status={!!status ? "success" : "error"}
      title={!!status ? "支付成功" : "支付失败"}
      description={
        !!status ? message : "如果您在支付过程中遇到了问题，请联系管理员。"
      }
      details={details}
      secondaryButtonText="返回查看订单"
      onSecondaryButtonClick={() => navigate(-1)}
      primaryButtonText="回到首页"
      onPrimaryButtonClick={() => navigate("/home", "replace")}
    />
  );
}
