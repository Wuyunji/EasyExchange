import { request } from "./request";

export function getMyCollect(userId) {
  return request({
    url: "/mycollect",
    params: {
      userId,
    },
    withCredentials: true, // 设置axios允许携带cookie
  });
}
