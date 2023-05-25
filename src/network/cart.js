import { request } from "./request";

export function updateChecked(userId, proId, checked) {
  return request({
    url: "/updatechecked",
    method: "post",
    data: {
      userId,
      proId,
      checked,
    },
    withCredentials: true, // 设置axios允许携带cookie
  });
}

export function batchUpdateChecked(userId, checked) {
  return request({
    url: "/batchupdatechecked",
    method: "post",
    data: {
      userId,
      checked,
    },
    withCredentials: true, // 设置axios允许携带cookie
  });
}

export function deleteCartByProId(userId, proId) {
  return request({
    url: "/cart/delete",
    method: "post",
    data: {
      userId,
      proId,
    },
    withCredentials: true, // 设置axios允许携带cookie
  });
}
