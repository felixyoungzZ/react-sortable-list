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