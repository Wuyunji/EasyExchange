import { request } from "./request";

export function getMyGoods(userId) {
  return request({
    url: "/mygoods",
    params: {
      userId,
    },
    withCredentials: true, // 设置axios允许携带cookie
  });
}
