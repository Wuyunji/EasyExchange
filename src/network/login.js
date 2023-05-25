import { request } from "./request";

export function verify(phone, password) {
  return request({
    url: "/login",
    method: "post",
    data: {
      phone,
      password,
    },
    withCredentials: true, // 设置axios允许携带cookie
  });
}
