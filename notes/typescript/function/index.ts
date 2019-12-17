// 函数式场景函数（同时约束输入和输出，输入参数严格匹配）
function sum (x: number, y: number): number {
  return x + y
}

sum(1, 2)
// sum(1, 3, 4) // 参数数量错误
// sum(1, '3') // 参数类型错误



// 函数表达式场景函数
let getSum = function (x, y) {
  return x + y
}

// 接口形式定义函数
interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc
mySearch = function (source: string, subString: string) {
  return source.search(subString) !== -1;
}

// 可选参数 可选参数后不允许再有必选参数
function buildName (firstName: string, lastName?: string): string {
  return lastName ? firstName + lastName : firstName
}

// 设置默认参数后，可选参数后面可以有必填参数
function buildName2 (firstName: string = 'tom', lastName: string) {
  return firstName + lastName
}

// 使用...rest表示剩余所有参数
function push (a: any[], ...rest: any[]) {
  rest.forEach(item => a.push(item))
  return a
}

let a = [];
push(a, 1, 2, 3) // [1,2,3]
