// 普通声明数组方式
let arr1: string[] = []

arr1.push('hell')

// arr1.push(1) // 报错 定义为了string，不能添加其他类型数据


// 泛型声明方式
let arr2: Array<number> = []

arr2.push(2)

// arr2.push('hh')  // 报错