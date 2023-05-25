import { request } from "./request";

export function getUserInfo(userId) {
  return request({
    url: "/userinfo",
    params: {
      userId,
    },
    withCredentials: true, // 设置axios允许携带cookie
  });
}

export function uploadAvatar(imgData) {
  return request({
    url: "/uploadavatar",
    method: "post",
    data: imgData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true, // 设置axios允许携带cookie
  });
}

export function updateUsername(userId, username) {
  return request({
    url: "/updateusername",
    method: "post",
    data: {
      userId,
      username,
    },
    withCredentials: true, // 设置axios允许携带cookie
  });
}

export function updateSignature(userId, signature) {
  return request({
    url: "/updatesignature",
    method: "post",
    data: {
      userId,
      signature,
    },
    withCredentials: true, // 设置axios允许携带cookie
  });
}

export function logout(userId) {
  return request({
    url: "/logout",
    method: "post",
    data: {
      userId,
    },
    withCredentials: true, // 设置axios允许携带cookie
  });
}
