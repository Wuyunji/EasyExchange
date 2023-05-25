import { request } from "./request";

export function register(phone, password, re_password) {
  return request({
    url: "/register",
    method: "post",
    data: {
      phone,
      password,
      re_password,
    },
    withCredentials: true, // 设置axios允许携带cookie
  });
}
