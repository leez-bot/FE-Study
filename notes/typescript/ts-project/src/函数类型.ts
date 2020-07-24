function foreach(arr: string[], callback: (k: number, v: string) => void) {
  for (let i: number = 0; i < arr.length; i++) {
    callback(i, arr[i])
  }
}


let arr = ['a', 'b', 'c']

foreach(arr, (key, v) => { })