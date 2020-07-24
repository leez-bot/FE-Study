// 接口是一种自定义类型，不是值

interface Point {
  x: string,
  y: string,
  color?: string,  // 通过？标注可选属性，该属性可填可不填
  readonly c: number // 通过readonly指定属性为只读，除初始化时，不可更改
}

let p1: Point = {
  x: '1',
  y: '2',
  color: 'aaa',
  c: 3
}
p1.color = 'ccc'
// p1.c = 4; // 只读属性修改报错

function concatString(x: Point['x'], y: Point['y']): string {
  return x + y
}

concatString('a', 'bb')

interface Point2 {
  x: number,
  y: number,
  [prop: number]: number, // 定义任意扩展属性（key值为数字）
  [prop: string]: number // 定义任意扩展属性(key值为字符串)
  // 当扩展类型同时包含数字索引和字符串索引时，数字索引类型必须是字符串索引类型的子类型或相同类型
}

let p2: Point2 = {
  x: 1,
  y: 2,
  0: 111,
  // z: 3 // 报错， key值声明为number
}