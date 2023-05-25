import axios from "axios";
import { LOCALBASEURL, LOCALSTORAGE } from "../common/constant";
import { Toast } from "antd-mobile";
import { LocalStorage } from "../common/utils";
import { store } from "../redux/store";
import { clearCart } from "../redux/reducers/cartSlice";
import { clearCollect } from "../redux/reducers/collectSlice";
const timeout = 10000;

export function request(config) {
  const instance = axios.create({
    baseURL: LOCALBASEURL,
    timeout,
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (res) => {
      return Promise.reject(res);
    }
  );

  instance.interceptors.response.use(
    (config) => {
      return config;
    },
    (res) => {
      if (res.response.status === 401) {
        Toast.show("请重新登录");
        // 删除用户信息
        LocalStorage.remove(LOCALSTORAGE.USER);
        // 清空购物车
        store.dispatch(clearCart());
        // 清空收藏
        store.dispatch(clearCollect());
        window.location.href = "/login";
      } else if (res.response.status === 500) {
        Toast.show("服务器崩溃了，请稍后再试");
      }
      return Promise.reject(res);
    }
  );

  return instance(config);
}
