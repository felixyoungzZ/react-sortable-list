export function swap<T>(idx1:number, idx2:number, arr:T[]) {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  return arr;
}