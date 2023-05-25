import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, Form, Input, Image, Button, Toast } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import { register } from "../../network/register";
import "./index.css";
import avatar from "../../assets/img/profile/user.webp";

export default function Register() {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // 点击登录按钮跳转到登录界面
  const routeToLogin = () => {
    navigate("/login", "replace");
  };

  const handleBack = () => {
    navigate("/home", "replace");
  };

  const submitForm = (values) => {
    const phone = values.phone;
    const password = values.password;
    const re_password = values.re_password;

    // 验证账号密码
    register(phone, password, re_password).then(
      (res) => {
        if (!res.data.data.status) {
          const errMsg = res.data.data.errMsg;
          if (errMsg.phoneErr) {
            Toast.show({ content: errMsg.phoneErr, duration: 3000 });
          } else if (errMsg.passwordErr) {
            Toast.show({ content: errMsg.passwordErr, duration: 3000 });
          } else if (errMsg.re_passwordErr) {
            Toast.show({ content: errMsg.re_passwordErr, duration: 3000 });
          } else if (errMsg.networkErr) {
            Toast.show({ content: errMsg.networkErr, duration: 3000 });
          } else if (errMsg.loginErr) {
            Toast.show({ content: errMsg.loginErr, duration: 3000 });
          } else {
            Toast.show({ content: "未知的出错", duration: 3000 });
          }
        } else {
          Toast.show({ content: "已成功注册! 跳转中...", duration: 3000 });
          // 登录成功后3s跳转到login
          setTimeout(() => {
            routeToLogin();
          }, 3000);
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

  const checkRePassword = (_, value) => {
    if (value) {
      if (value !== form.getFieldValue("password")) {
        return Promise.reject(new Error("两次密码不一致"));
      }
      return Promise.resolve();
    }
    return Promise.reject(new Error("密码不能为空"));
  };

  return (
    <div className="register">
      <NavBar back="首页" onBack={handleBack}>
        请您完成注册
      </NavBar>
      <div className="register-box">
        <div className="avatar">
          <Image
            src={avatar}
            width={64}
            height={64}
            fit="cover"
            style={{ borderRadius: 32 }}
          />
        </div>
        <div className="register-form">
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
                  {!visible1 ? (
                    <EyeInvisibleOutline onClick={() => setVisible1(true)} />
                  ) : (
                    <EyeOutline onClick={() => setVisible1(false)} />
                  )}
                </div>
              }
            >
              <Input
                autoComplete="true"
                placeholder="请设置密码"
                clearable
                type={visible1 ? "text" : "password"}
              />
            </Form.Item>
            <Form.Item
              label="重复密码"
              name="re_password"
              rules={[{ validator: checkRePassword }]}
              extra={
                <div className="eye">
                  {!visible2 ? (
                    <EyeInvisibleOutline onClick={() => setVisible2(true)} />
                  ) : (
                    <EyeOutline onClick={() => setVisible2(false)} />
                  )}
                </div>
              }
            >
              <Input
                autoComplete="true"
                placeholder="请重复密码"
                clearable
                type={visible2 ? "text" : "password"}
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
              注册
            </Button>
          </Form>
        </div>
        <Button
          block
          shape="rounded"
          style={{ margin: "10px 0" }}
          onClick={routeToLogin}
        >
          返回登录
        </Button>
      </div>
    </div>
  );
}
