// 元组类型可以在数组中放多个类型数据，初始化时类型与数据位置必须一致
// 后续添加的数据需为场景类型之一
let data1: [string, number] = ['hello', 1]

data1.push(33)

data1.push('hhh')

// data1.push({key: 'value'}) // 报错 无此类型场景