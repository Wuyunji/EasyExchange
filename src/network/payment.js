import { request } from "./request";

export function getOneOrder(userId, orderId) {
  return request({
    url: "/order/oneorder",
    params: {
      userId,
      orderId,
    },
    withCredentials: true, // 设置axios允许携带cookie
  });
}

export function getAllOrder(userId) {
  return request({
    url: "/order/allorder",
    params: {
      userId,
    },
    withCredentials: true, // 设置axios允许携带cookie
  });
}

export function createOrder(userId, phone, products) {
  return request({
    url: "/order/create",
    method: "post",
    data: {
      userId,
      phone,
      products,
    },
    withCredentials: true, // 设置axios允许携带cookie
  });
}

export function updateOrder(userId, orderId, payment) {
  return request({
    url: "/order/update",
    method: "post",
    data: {
      userId,
      orderId,
      payment,
    },
    withCredentials: true, // 设置axios允许携带cookie
  });
}

export function closeOrder(userId, orderId) {
  return request({
    url: "/order/close",
    method: "post",
    data: {
      userId,
      orderId,
    },
    withCredentials: true, // 设置axios允许携带cookie
  });
}
