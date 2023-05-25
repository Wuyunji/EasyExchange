import React, { useEffect, useRef, useState } from "react";
import { Card, Avatar, Toast, Input, Form } from "antd-mobile";
import edit from "../../../assets/img/profile/edit.png";
import done from "../../../assets/img/profile/done.png";
import {
  uploadAvatar,
  updateUsername,
  updateSignature,
} from "../../../network/profile";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { LOCALBASEURL, LOCALSTORAGE } from "../../../common/constant";
import { LocalStorage } from "../../../common/utils";

export default function ProfileBasicInfo(props) {
  const { userInfo } = props;
  const { username, avatar, signature } = userInfo;

  const [editableEditName, setEditableEditName] = useState(false);
  const [editableEditSignature, setEditableEditSignature] = useState(false);

  const [profileAvatar, setProfileAvatar] = useState(avatar);
  const [usernameValue, setUsernameValue] = useState(username);
  const [signaturValue, setSignaturValue] = useState(signature);

  const usernameRef = useRef();
  const signatureRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    setProfileAvatar(avatar);
  }, [avatar]);

  useEffect(() => {
    setUsernameValue(username);
  }, [username]);

  useEffect(() => {
    setSignaturValue(signature);
  }, [signature]);

  const userId = LocalStorage.get(LOCALSTORAGE.USER)?.userId;

  const editName = () => {
    if (!userId) {
      Toast.show("请重新登录");
      navigate("/login");
      return;
    }
    if (editableEditName) {
      usernameRef.current.nativeElement.classList.remove("focus");
      usernameRef.current.nativeElement.readOnly = true;
      const newName = usernameValue;
      updateUsername(userId, newName).then(({ data: { data } }) => {
        if (data.status) {
          setUsernameValue(data.username);
          Toast.show("上传成功");
        } else {
          Toast.show(data.message);
        }
      });
    } else {
      usernameRef.current.nativeElement.classList.add("focus");
      usernameRef.current.nativeElement.readOnly = false;
    }
    setEditableEditName(!editableEditName);
  };

  const editSignature = () => {
    if (!userId) {
      Toast.show("请重新登录");
      navigate("/login");
      return;
    }
    if (editableEditSignature) {
      signatureRef.current.nativeElement.classList.remove("focus");
      signatureRef.current.nativeElement.readOnly = true;
      const newSignature = signaturValue;
      updateSignature(userId, newSignature).then(({ data: { data } }) => {
        if (data.status) {
          setSignaturValue(data.signature);
          Toast.show("上传成功");
        } else {
          Toast.show(data.message);
        }
      });
    } else {
      signatureRef.current.nativeElement.classList.add("focus");
      signatureRef.current.nativeElement.readOnly = false;
    }
    setEditableEditSignature(!editableEditSignature);
  };

  const handleUpload = (e) => {
    if (!e.target.files.length) return;
    if (!userId) {
      Toast.show("请重新登录");
      navigate("/login");
      return;
    }
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("imgData", file);
    formData.append("userId", userId);
    uploadAvatar(formData).then(({ data: { data } }) => {
      if (data.status) {
        setProfileAvatar(data.url);
        Toast.show("上传成功");
      } else {
        Toast.show(data.message);
      }
    });
  };

  return (
    <Card className="profile-basicinfo">
      <div className="profile-avatar-box">
        <input
          type="file"
          className="profile-avatar-upload"
          onChange={handleUpload}
        />
        <Avatar
          className="profile-avatar"
          src={profileAvatar ? LOCALBASEURL + profileAvatar : ""}
        />
      </div>
      <Form layout="horizontal">
        <Form.Item label="昵称：" className="profile-name">
          <div className="flex">
            <Input
              readOnly
              style={{ width: "auto" }}
              value={usernameValue}
              onChange={(v) => {
                setUsernameValue(v);
              }}
              ref={usernameRef}
            />
            <span className="profile-edit" onClick={editName}>
              <img src={editableEditName ? done : edit} alt="" />
            </span>
          </div>
        </Form.Item>
        <Form.Item label="个性签名：" className="profile-signature">
          <div className="flex">
            <Input
              readOnly
              style={{ width: "auto" }}
              value={signaturValue}
              onChange={(v) => {
                setSignaturValue(v);
              }}
              ref={signatureRef}
            />
            <span className="profile-edit" onClick={editSignature}>
              <img src={editableEditSignature ? done : edit} alt="" />
            </span>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
}
