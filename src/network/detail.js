import { request } from "./request";

export function getDetailData(proId) {
  return request({
    url: "/detail/",
    params: {
      proId,
    },
  });
}

export function getRecommend() {
  return request({
    url: "/recommend",
  });
}

export function getShopData(userId) {
  return request({
    url: "/detail/shop",
    params: {
      userId,
    },
  });
}

export function updateCollect(userId, proId, isCollect) {
  return request({
    url: "/updatecollect",
    method: "post",
    data: {
      userId,
      proId,
      isCollect,
    },
    withCredentials: true, // 设置axios允许携带cookie
  });
}

export function updateCart(userId, product) {
  return request({
    url: "/updatecart",
    method: "post",
    data: {
      userId,
      product,
    },
    withCredentials: true, // 设置axios允许携带cookie
  });
}

export function getDetailRecommend(page, search) {
  return request({
    url: "/home/search",
    params: {
      page,
      search,
    },
  });
}
