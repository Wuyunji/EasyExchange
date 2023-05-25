import { request } from "./request";

export function getHomeGoods(page) {
  return request({
    url: "/home/data",
    params: {
      page,
    },
  });
}

export function getHomeSearch(page, search) {
  return request({
    url: "/home/search",
    params: {
      page,
      search,
    },
  });
}

export function getHomeRecommend(userId) {
  return request({
    url: "/home/Recommend",
    params: {
      userId,
    },
    withCredentials: true, // 设置axios允许携带cookie
  });
}
