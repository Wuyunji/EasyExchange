import React, { useState } from "react";
import {
  Form,
  Button,
  Input,
  Stepper,
  TextArea,
  ImageUploader,
  Dialog,
  Toast,
  NavBar,
} from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { uploadProduct } from "../../network/product";
import "./index.css";
import { LOCALSTORAGE } from "../../common/constant";
import { LocalStorage } from "../../common/utils";

export default function Product() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const maxCount = 9; //图片最大数量

  const onback = () => {
    navigate("/profile", "replace");
  };

  const checkPrice = (_, value) => {
    const priceReg = /(^[0-9]+$)|(^[0-9]+\.{1}[0-9]{0,2}$)/;
    if (value) {
      if (Object.is(Number(value), NaN)) {
        return Promise.reject(new Error("商品价格只能是数字"));
      }
      if (value[0] === "-") {
        return Promise.reject(new Error("商品价格不能为负"));
      }
      if (value === "0" || value === "0.0" || value === "0.00") {
        return Promise.reject(new Error("商品价格不能为0"));
      }
      if (!priceReg.test(value)) {
        return Promise.reject(new Error("小数最多设置2位"));
      }
      return Promise.resolve();
    }
    return Promise.reject(new Error("商品价格不能为空"));
  };

  const beforeUpload = (file) => {
    if (file.size > 1024 * 1024 * 10) {
      Toast.show("请选择小于 10M 的图片", 3000);
      return null;
    }
    setFiles([...files, file]);
    return file;
  };

  const onUpload = (file) => {
    return {
      url: URL.createObjectURL(file),
    };
  };

  const onDelete = (e) => {
    return Dialog.confirm({
      content: "是否确认删除",
    }).then((value) => {
      if (value) {
        for (let i = 0; i < fileList.length; i++) {
          if (fileList[i].url === e.url) {
            files.splice(i, 1);
            setFiles([...files]);
            break;
          }
        }
      }
      return value;
    });
  };

  const onCountExceed = (exceed) => {
    Toast.show(`最多选择 ${maxCount} 张图片，你多选了 ${exceed} 张`);
  };

  const checkImgs = (_, value) => {
    if (value) {
      if (value.length > 0) {
        return Promise.resolve();
      }
    }
    return Promise.reject(new Error("至少上传1张图片"));
  };

  const submitForm = (values) => {
    const { name, stock, price, detail } = values;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("imgs", files[i]);
    }
    const owner = LocalStorage.get(LOCALSTORAGE.USER)?.userId;
    formData.append("owner", owner);
    formData.append("name", name);
    formData.append("detail", detail);
    formData.append("price", Number(price).toFixed(2));
    formData.append("stock", Number(stock));

    uploadProduct(formData)
      .then(({ data: { data } }) => {
        if (data.status) {
          Toast.show("商品上传成功");
          setTimeout(() => {
            navigate("/profile", "replace");
          }, 2000);
        } else {
          Toast.show("商品上传失败");
        }
      })
      .catch((err) => {
        console.log(err);
        Toast.show("网络不稳定,请稍后重试", 3000);
      });
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      footer={
        <Button block type="submit" color="primary" size="large">
          提交
        </Button>
      }
      initialValues={{ stock: 1, detail: "" }}
      onFinish={submitForm}
    >
      <NavBar onBack={onback} className="product-title">
        请填写商品信息
      </NavBar>
      <Form.Item
        name="name"
        label="商品名称"
        rules={[{ required: true, message: "商品名称不能为空" }]}
      >
        <Input placeholder="请输入商品名称" maxLength={20} />
      </Form.Item>
      <Form.Item name="stock" label="数量" required>
        <Stepper inputReadOnly min={1} />
      </Form.Item>
      <Form.Item
        name="price"
        label="价格"
        required
        rules={[{ validator: checkPrice }]}
      >
        <Input placeholder="请输入价格" />
      </Form.Item>
      <Form.Item
        name="imgs"
        label="上传图片"
        required
        rules={[{ validator: checkImgs }]}
      >
        <ImageUploader
          value={fileList}
          beforeUpload={beforeUpload}
          onChange={setFileList}
          upload={onUpload}
          onDelete={onDelete}
          maxCount={maxCount}
          showUpload={fileList.length < maxCount}
          onCountExceed={onCountExceed}
        />
      </Form.Item>
      <Form.Item name="detail" label="详细信息" help="填写额外的详细描述">
        <TextArea
          placeholder="请输入该商品的详细信息"
          maxLength={100}
          rows={3}
          showCount
        />
      </Form.Item>
    </Form>
  );
}
