/**
 * 数组交换位置
 * @param idx1 索引 1
 * @param idx2 索引 2
 * @param arr 原数组
 */
export function swap<T>(idx1:number, idx2:number, arr:T[]) {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  return arr;
}

/**
 * 简易版节流
 * @param {*} fn 
 * @param {*} wait 
 */
 export function throttle(fn:Function, wait:number = 50) {
  let previous = 0;
  let now;

  return function(...args) {
    // 获取当前时间，转换成时间戳，单位毫秒
    now = +new Date();

    // 将当前时间和上一次执行函数的时间进行对比
    // 大于等待时间就把 previous 设置为当前时间并执行函数 fn
    if (now - previous >= wait) {
      previous = now;
      fn.apply(this, args);
    }
  }
}


/**
 * 获取平台
 */
 function get_platform() {
  if (
    navigator.userAgent.indexOf('iPad') >= 0 ||
    navigator.userAgent.indexOf('iPhone') >= 0
  ) {
    return 'ios';
  }
  if (navigator.userAgent.indexOf('Android') >= 0) {
    return 'android';
  }
  return 'pc';
}

/**
 * PC 端
 */
export function is_pc() {
  return get_platform() === 'pc';
}

/**
 * 手机端
 */
export function is_mobile() {
  return get_platform() !== 'pc';
}