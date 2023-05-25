import { request } from "./request";

export function uploadProduct(product) {
  return request({
    url: "/uploadproduct",
    method: "post",
    data: product,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true, // 设置axios允许携带cookie
  });
}
