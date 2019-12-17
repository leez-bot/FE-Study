interface Person {
  readonly id: number, // 定义只读属性，不允许变更
  name: string,
  age: number,
  sex?: string, // 使用？来表示该属性不必完全匹配
  [propName: string]: string | number, // 定义任意属性，一定定义，其他属性返回值类型也必须被包含在这里面
}

// tom对应的属性和属性类型必须与person完全对应
let tom: Person = {
  id: 33354,
  name: 'tom',
  age: 33,
  sex: '男',
  heart: 88,
}

// 只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
// tom.id = 4325435 报错，id属性为只读