import { request } from "./request";

export function getInitalValues(userId) {
  return request({
    url: "/getStore",
    params: {
      userId,
    },
    withCredentials: true, // 设置axios允许携带cookie
  });
}
