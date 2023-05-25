import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, Form, Input, Image, Button, Toast } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import { verify } from "../../network/login";
import "./index.css";
import { set } from "../../redux/reducers/authSlice";
import { useDispatch } from "react-redux";
import { getInitalValues } from "../../network/redux";
import { update } from "../../redux/reducers/cartSlice";
import { LOCALSTORAGE } from "../../common/constant";
import { toggle } from "../../redux/reducers/collectSlice";
import { LocalStorage } from "../../common/utils";
import avatar from "../../assets/img/profile/user.webp";

export default function Login() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  // 点击注册按钮跳转到注册界面
  const routeToRegister = () => {
    navigate("/register", "replace");
  };

  const handleBack = () => {
    navigate("/home", "replace");
  };

  const submitForm = (values) => {
    const phone = values.phone;
    const password = values.password;

    // 验证账号密码
    verify(phone, password).then(
      (res) => {
        if (!res.data.data.status) {
          const errMsg = res.data.data.errMsg;
          if (errMsg.phoneErr) {
            Toast.show({ content: errMsg.phoneErr, duration: 3000 });
          } else if (errMsg.passwordErr) {
            Toast.show({ content: errMsg.passwordErr, duration: 3000 });
          } else if (errMsg.networkErr) {
            Toast.show({ content: errMsg.networkErr, duration: 3000 });
          } else if (errMsg.loginErr) {
            Toast.show({ content: errMsg.loginErr, duration: 3000 });
          } else {
            Toast.show({ content: "未知的出错", duration: 3000 });
          }
        } else {
          // 登录成功后跳转到profile
          const { phone, username, avatar, role, signature, userId } =
            res.data.data.data;
          const userData = {
            phone,
            username,
            avatar,
            role,
            signature,
            userId,
          };

          getInitalValues(userId).then(({ data: { data } }) => {
            // 将信息存入localstorage
            LocalStorage.set(LOCALSTORAGE.USER, userData);
            // 将登录状态信息存入redux
            dispatch(set(true));
            data.cart.forEach((item) => {
              dispatch(update(item));
            });
            data.collect.forEach((item) => {
              dispatch(toggle(JSON.stringify(item)));
            });
            Toast.show({ content: "已成功登录", duration: 3000 });
            setTimeout(() => {
              navigate("/profile", "replace");
            }, 3000);
          });
        }
      },
      (err) => {
        console.log(err);
        Toast.show({ content: "网络不稳定,请稍后重试", duration: 3000 });
      }
    );
  };

  const checkMobile = (_, value) => {
    if (value) {
      const phoneReg = /^\d{11}$/;
      if (!phoneReg.test(value)) {
        return Promise.reject(new Error("手机号格式只能11位"));
      }
      return Promise.resolve();
    }
    return Promise.reject(new Error("手机号不能为空"));
  };

  const checkPassword = (_, value) => {
    if (value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("密码不能为空"));
  };

  return (
    <div className="login">
      <NavBar back="首页" onBack={handleBack}>
        您需要登录才能继续访问
      </NavBar>
      <div className="login-box">
        <div className="avatar">
          <Image
            src={avatar}
            width={64}
            height={64}
            fit="cover"
            style={{ borderRadius: 32 }}
          />
        </div>
        <div className="login-form">
          <Form layout="horizontal" form={form} onFinish={submitForm}>
            <Form.Item
              label="手机号"
              name="phone"
              rules={[{ validator: checkMobile }]}
            >
              <Input placeholder="请输入手机号" clearable />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ validator: checkPassword }]}
              extra={
                <div className="eye">
                  {!visible ? (
                    <EyeInvisibleOutline onClick={() => setVisible(true)} />
                  ) : (
                    <EyeOutline onClick={() => setVisible(false)} />
                  )}
                </div>
              }
            >
              <Input
                autoComplete="true"
                placeholder="请输入密码"
                clearable
                type={visible ? "text" : "password"}
              />
            </Form.Item>
            <Button
              type="submit"
              block
              shape="rounded"
              loading="auto"
              loadingText="正在登录"
              style={{ margin: "10px 0", fontSize: "24px" }}
            >
              登录
            </Button>
          </Form>
        </div>
        <Button
          block
          shape="rounded"
          style={{ margin: "10px 0" }}
          onClick={routeToRegister}
        >
          还没有账号？注册
        </Button>
      </div>
    </div>
  );
}
