let arr: number[] = [2, 3, 5, 6]
// 泛型定义数组
let arr1: Array<number> = [1, 3, 4, 6, 7]

// arr.push('hello') // 方法也会被限制数据类型
// any表示数组中可以存在任意类型
let list: any[] = [1, 'h3ll', {name: 'kee', age: 32}]