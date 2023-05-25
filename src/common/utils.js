// 日期格式化
export function formatDate(date, format) {
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return format;
}

export class Product {
  constructor(proId, proName, mainImage, price, detail, count) {
    this.proId = proId;
    this.proName = proName;
    this.mainImage = mainImage;
    this.price = price;
    this.detail = detail;
    this.checked = false;
    this.count = count;
  }
}

export class LocalStorage {
  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  static get(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  static remove(key) {
    localStorage.removeItem(key);
  }
  static clear() {
    localStorage.clear();
  }
}
